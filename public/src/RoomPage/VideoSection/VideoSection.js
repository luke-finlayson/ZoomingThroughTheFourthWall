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

// Peer connection references, for main streaming and screen sharing
let peer;
let peer2;

const VideoSection = ({ socket, streams }) => {
  const videoContainer = createRef()
  const [containerWidth, setWidth] = useState()
  const [containerHeight, setHeight] = useState()

  // Unique id of this user
  const userId = store.getState().userId;
  const [userStream, setUserStream] = useState();
  const [displayStream, setDisplayStream] = useState();
  // Stores the list of streams as a state so that UI updates with new streams
  const [streamsState, setStreams] = useState(streams.slice());
  
  // Varioud UI toggles
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const [index, setIndex] = useState(0)

  // Current value of screen sharing.
  const { height } = useDetermineLayout(streams.slice(), containerWidth, containerHeight);

  // Need to use polling to ensure only single instances of connections are created
  useInterval(() => {
    // Establish the peer connection if it hasn't already
    if (!peer && socket !== null && socket.connected) {
      // Attempt main peerjs connection
      peer = new Peer(userId, {
        host: "/",
        port: 443,
        path: '/peerjs',
        secure: true
      });

      // Open peer connection, and join the room once connected
      peer.on('open', (id) => {
        // Get the state of the store
        const state = store.getState();

        socket.emit(SocketEvents.JoinRoom, state.roomId, userId, state.username, (joinResponse) => {
        });
      });

      peer.on('error', (err) => {
        console.log(err)
      })

      // Display a blank video frame before requesting media
      addVideoStream(userId, null, true, null, false);
    }

    if (!peer2 && socket !== null && socket.connected) {
      // Attempt second peerjs connection for screen sharing etc...
      peer2 = new Peer("DISP" + userId, {
        host: '/',
        port: 443,
        path: '/peerjs',
        secure: true
      })

      peer2.on('error', (err) => {
        console.log(err)
      })
    }
  }, 100);

  useEffect(() => {
    if (peer && !userStream && streams.length > 0) {
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
            addVideoStream(call.peer, newStream, false, call, false);
          });
        });

        // Announce to server that this client is ready to recieve peer calls
        socket.emit(SocketEvents.PeerReady);

        // Setup socket event to connect to new room members
        socket.on(SocketEvents.UserJoinedRoom, (newUserId) => {
          connectToNewUser(newUserId, stream);

          if (displayStream) {
            const call = peer2.call(newUserId, displayStream);
          }
        });

        // Setup socket event to remove disconnected room members
        socket.on(SocketEvents.UserLeftRoom, (disconnectedUser) => {
          removeVideoStream(disconnectedUser);
        });
      })
    }
  }, [peer])

  useEffect(() => {
    if (videoContainer && videoContainer.current && !containerWidth) {
      // Intialise container width and height once video container has been rendered
      setWidth(videoContainer.current.clientWidth)
      setHeight(videoContainer.current.clientHeight)
    }
  }, [videoContainer])

  // When a new user joins the room, attempt to connect
  const connectToNewUser = (newUserId, stream) => {
    const call = peer.call(newUserId, stream);

    // Set second user stream on call answered
    call.on("stream", (newStream) => {
      // Add new stream to the list of streams
      addVideoStream(newUserId, newStream, false, call, false);
    });
  }

  // Adds a video stream to the list of video streams
  const addVideoStream = (newUserId, newStream, muted, call, isDisplayMedia) => {
    // Add new stream to list of streams if it isn't already
    if(!streams.some(e => e.userId === newUserId)) {
      streams.push({
        userId: newUserId,
        stream: newStream,
        muted: muted,
        call: call,
        isDisplayMedia: isDisplayMedia,
        width: 400,
        height: 400
      });
      // Update the streams state
      setStreams(streams.slice());
    }
  }

  const removeVideoStream = (userId) => {
    // Locate and delete the stream matching the given user id
    for( var i = 0; i < streams.length; i++) { 
      if ( streams[i].userId === userId) { 
        // End the peerjs call if it exists
        if(streams[i].call) {
          streams[i].call.close();
        }

        streams.splice(i, 1); 
      }
    }
    // Update the streams state
    setStreams(streams.slice());
  }

  const updateStreamDimensions = (id, width, height) => {
    streams.forEach((user) => {
      // Locate the stream to update
      if (user.userId === id) {
        user.width = width
        user.height = height
      }
    });

    // Update the streams state
    setStreams(streams.slice());
  }

  const toggleScreenSharing = () => {
    if (!displayStream) {
      // Get stream from screen
      navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true 
      }).then((newDisplayStream) => {
        // Add display stream
        addVideoStream("DISP" + userId, newDisplayStream, true, null, true);
        setIndex(index + 1)
        setStreams(streams.slice());
        setDisplayStream(newDisplayStream);

        // Setup peer event to receive calls
        peer2.on("call", (call) => {
          // Otherwise answer the call with the stream and userId
          call.answer(newDisplayStream);
        });

        socket.emit(SocketEvents.NewStream, "DISP" + userId, store.getState().username + "'s Screen Share")

        // Toggle value of screen sharing
        store.dispatch({ type: 'SET_SCREEN_SHARING', payload: true })
      });
    }
    else {
      setDisplayStream(null);
      removeVideoStream("DISP" + userId)
      setStreams(streams.slice());

      // Stop display stream
      displayStream.getTracks().forEach(track => track.stop());

      socket.emit(SocketEvents.RemoveStream, "DISP" + userId);

      // Toggle value of screen sharing
      store.dispatch({ type: 'SET_SCREEN_SHARING', payload: false })
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
      toggleScreenSharing={toggleScreenSharing}
      />

      {/* Create video frames for each user in the list of streams */}
      <div className="video-stream-container" ref={videoContainer}>
        {streamsState.map((user, index) => {
            return (
                <VideoFrame
                key={index}
                user={user}
                height={height - 10}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                updateStreamDimensions={updateStreamDimensions}
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
    </div>
  )
}

export default VideoSection
