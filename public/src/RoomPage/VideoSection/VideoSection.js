import React, { useState, createRef, useEffect } from 'react';
import './VideoSection.css';
import VideoButtons from '../VideoButtons/VideoButtons';
import VideoFrame from './VideoFrame';
import ImagePopup from './ImagePopup';
import { store } from '../../store/store';
import { useInterval } from '../../Utilities/useInterval';
import { Peer } from 'peerjs';
import SocketEvents from '../../Utilities/socketevents';
import useDetermineLayout from '../../Utilities/useDetermineLayout';

const VideoSection = ({ socket, streams }) => {
  const videoContainer = createRef()
  const [containerWidth, setWidth] = useState()
  const [containerHeight, setHeight] = useState()

  // Holds the peer connection object
  const [peer, setPeer] = useState(null);

  // Unique id of this user
  const userId = store.getState().userId;
  const [getStream, setStream] = useState(true);
  const [userStream, setUserStream] = useState();
  // Stores the list of streams as a state so that UI updates with new streams
  const [streamsState, setStreams] = useState(streams.slice());
  
  // Varioud UI toggles
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  // Current value of screen sharing.
  const [isScreenSharing, setScreenSharing] = useState(false);
  const { rows, cols, width, height, area } = useDetermineLayout(streams.slice(), containerWidth, containerHeight);


  useEffect(() => {
    if (videoContainer && videoContainer.current && !containerWidth) {
      // Intialise container width and height once video container has been rendered
      setWidth(videoContainer.current.clientWidth)
      setHeight(videoContainer.current.clientHeight)
    }
  }, [videoContainer])

  // When a new user joins the room, attempt to connect
  const connectToNewUser = (newUserId, stream) => {
    // Call second user
    const call = peer.call(newUserId, stream);
    // Set second user stream on call answered
    call.on("stream", (newStream) => {
      // Add new stream to the list of streams
      addVideoStream(newUserId, newStream, false, call);
    });
  }

  // Adds a video stream to the list of video streams
  const addVideoStream = (newUserId, newStream, muted, call) => {
    // Add new stream to list of streams if it isn't already
    if(!streams.some(e => e.userId === newUserId)) {
      streams.push({
        userId: newUserId,
        stream: newStream,
        muted: muted,
        call: call
      });
      // Update the streams state
      setStreams(streams.slice());
    }
  }

  // Replaces the stream in the peer connection with the given stream
  const replacePeerStreams = (mediaStream) => {

    streams.forEach((user) => {
      // Only replace stream if call exists
      if (user.call !== null) {
        // Get tracks being streamed
        var senders = user.call.peerConnection.getSenders();

        senders.forEach((sender) => {
          // Replace audio track
          if (sender.track.kind === "audio") {
            if (mediaStream.getAudioTracks().length > 0) {
              sender.replaceTrack(mediaStream.getAudioTracks()[0]);
            }
          }
          // Replace video track
          if (sender.track.kind === "video") {
            if (mediaStream.getVideoTracks().length > 0) {
              sender.replaceTrack(mediaStream.getVideoTracks()[0]);
            }
          }
        });
      }
    });
  }


  // Need to use polling to ensure only single instances of connections are created
  useInterval(() => {
    // Establish the peer connection if it hasn't already
    if (peer === null && socket !== null && socket.connected) {
      // Attempt main peerjs connection
      const peer = new Peer(userId, {
        host: "/",
        port: 443,
        path: '/peerjs',
        secure: true,
      });
      setPeer(peer);

      // Open peer connection, and join the room once connected
      peer.on('open', (id) => {
        // Get the state of the store
        const state = store.getState();

        socket.emit(SocketEvents.JoinRoom, state.roomId, userId, state.username, (joinResponse) => {
        });
      });

      addVideoStream(userId, null, true, null);
    }

    // Request user media, but add an object to list of streams regardless of 
    // result so that blank element is displayed
    if (getStream && peer !== null && streams.length !== 0) {

      // Get the webcam and audio stream from the user device
      navigator.mediaDevices.getUserMedia({
        audio: !store.getState().connectOnlyWithAudio,
        video: true
      }).then((stream) => {
        // Update user object in the list of streams to include the user's media stream
        for (const i in streams) {
          if (streams[i].userId === userId) {
            streams[i].stream = stream;
          }
        }

        setStreams(streams.slice())
        setUserStream(stream);

        // Setup peer event to receive calls
        peer.on("call", (call) => {
          // Otherwise answer the call with the stream and userId
          call.answer(stream);

          // Setup peer event to receive media streams
          call.on("stream", (newStream) => {
            addVideoStream(call.peer, newStream, false, call);
          });
        });

        // Announce to server that this client is ready to recieve peer calls
        socket.emit(SocketEvents.PeerReady);

        // Setup socket event to connect new room members
        socket.on(SocketEvents.UserJoinedRoom, (newUserId) => {
          // Connect to new user
          connectToNewUser(newUserId, stream);
        });

        // Setup socket event to remove disconnected room members
        socket.on(SocketEvents.UserLeftRoom, (disconnectedUser) => {
          // Filter out streams matching disconnected id
          streams = streams.filter((e) => {
            return e.userId !== disconnectedUser;
          });
          // Update the streams state
          setStreams(streams.slice())
        });
      })

      // Ensure media stream isn't requested again
      setStream(false);
    }

    // Get the state of the store
    const state = store.getState();

    // Only do something if the state of screen sharing has changed and this is the user's stream
    if (isScreenSharing !== state.isScreenSharing && streams[0] !== null) {
      // Toggle screen sharing
      setScreenSharing(state.isScreenSharing);

      if(!isScreenSharing) {
        // Get stream from screen
        navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        }).then((displayStream) => {
          // Replace other users streams
          replacePeerStreams(displayStream);
          // Replace clients stream
          streams[0].stream = displayStream;
          setStreams(streams.slice());
        });
      }
      else {
        // Change video source back to webcam
        replacePeerStreams(userStream);
        // Replace clients stream
        streams[0].stream = userStream;
        setStreams(streams.slice());
      }
    }
  }, 100);

  /* TEMPORY FUNCTION - REMOVE LATER */
  const modifyStreams = (add) => {
    // Add or remove dummy streams to simulate multiple users
    if (add) {
      addVideoStream(userId + streams.length, userStream, true, null);
    }
    else if(streams.length > 1) {
      streams.pop();
      setStreams(streams.slice())
    }
  }

  return (
    <div className="video_section_container">
      {/* Render the control buttons at the top of the screen */}
      <VideoButtons
      socket={socket}
      peer={peer}
      stream={userStream}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      setShowPopup={setShowPopup}
      />

      {/* Create video frames for each user in the list of streams */}
      <div className="video-stream-container" ref={videoContainer}>
        {streamsState.map((user, index) => {
            return (
                <VideoFrame
                key={index}
                stream={user.stream}
                userId={user.userId}
                muted={user.muted}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                height={height - 10}
                />
            )
        })}
      </div>

      {/* Display a popup with the text found in an image */}
      {showPopup && <ImagePopup
        user_id={selectedUser}
        setShowPopup={setShowPopup}
        socket={socket}
        setSelectedUser={setSelectedUser} />}

      {/* Temporary buttons to easily add or remove video streams to test grid layouts */}
      <div className='temp_buttons'>
        <button onClick={() => modifyStreams(true)}>Add</button>
        <button onClick={() => modifyStreams(false)}>Remove</button>
      </div>
    </div>
  )
}

export default VideoSection
