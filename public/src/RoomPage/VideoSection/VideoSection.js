import React, { useState } from 'react';
import './VideoSection.css';
import VideoButtons from '../VideoButtons/VideoButtons';
import VideoFrame from './VideoFrame';
import ImagePopup from './ImagePopup';
import { store } from '../../store/store';
import { useInterval } from '../useInterval';
import { Peer } from 'peerjs';
import SocketEvents from '../socketevents';

const VideoSection = ({ socket, streams }) => {

  // Unique id of this user
  const userId = store.getState().userId;
  // Used to ensure user stream is only fetched once
  const [getStream, setStream] = useState(true);

  // Holds the peer connection objects
  const [peer, setPeer] = useState(null);

  // Stores the list of streams as a state so that UI updates with new streams
  const [streamsState, setStreams] = useState(streams.slice());
  const [myStream, setMyStream] = useState();
  // When true, dispays the current video frame in a popup window
  const [showPopup, setShowPopup] = useState(false);
  // The ID of the user associated with the selected video frame
  const [selectedUser, setSelectedUser] = useState();

  // Current value of screen sharing.
  // (For some weird reason this will actually be the opposite of the true value idk whats up)
  const [isScreenSharing, setScreenSharing] = useState(false);

  // When a new user joins the room, attempt to connect
  const connectToNewUser = (newUserId, stream) => {
    // Call second user
    const call = peer.call(newUserId, stream);
    // Set second user stream on call answered
    call.on("stream", (newStream) => {
      console.log("[c]Added stream from " + newUserId);
      // Add new stream to the list of streams
      addVideoStream(newUserId, newStream, false, call);
    });
  }

  // Adds a video stream to the list of video streams
  const addVideoStream = (newUserId, newStream, muted, call) => {
    if(!streams.some(e => e.stream === newStream)) {
      // Add new stream to list of streams if it isn't already
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
    if (peer === null && socket != null) {
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
    }

    // In order for peer calls to work, need to get media after connections
    // been made, which will cause a slight delay before the user's camera
    // feed is displayed. May revisit how this works later to improve UX
    if (getStream && peer !== null) {
      // Get the webcam and audio stream from the user device
      navigator.mediaDevices.getUserMedia({
        audio: !store.getState().connectOnlyWithAudio,
        video: true
      }).then((stream) => {
        // Attach stream to video element
        addVideoStream(userId, stream, true, null);
        setMyStream(stream);

        // Setup peer event to receive calls
        peer.on("call", (call) => {
          // Otherwise answer the call with the stream and userId
          call.answer(stream);

          // Setup peer event to receive media streams
          call.on("stream", (newStream) => {
            console.log("[a]Added stream from " + call.peer);
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
      });
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
        replacePeerStreams(myStream);
        // Replace clients stream
        streams[0].stream = myStream;
        setStreams(streams.slice());
      }
    }
  }, 100);

  return (
    <div className="video_section_container">
    {streams[0] &&
      <VideoButtons
      socket={socket}
      peer={peer}
      streams={streamsState}
      />
    }
      <div className="video-stream-container" id="video-container">
        {streamsState.map((user, index) => {
            return (
                <VideoFrame
                key={index}
                stream={user.stream}
                userId={user.userId}
                muted={user.muted}
                setShowPopup={setShowPopup}
                setSelectedUser={setSelectedUser}
                />
            )
        })}
      </div>
      {showPopup && <ImagePopup
        user_id={selectedUser}
        setShowPopup={setShowPopup}
        socket={socket} />}
    </div>
  )
}

export default VideoSection
