import React, { useState } from 'react';
import VideoButtons from './VideoButtons';
import VideoFrame from './VideoFrame';
import { store } from '../../store/store';
import { useInterval } from './useInterval';
import { Peer } from 'peerjs';
const SocketEvents = require('../socketevents');

// Array to keep track of all connected streams
var streams = [];

const VideoSection = ({ socket }) => {

  // Unique id of this user
  const userId = store.getState().userId;
  // Used to ensure user stream is only fetched once
  const [getStream, setStream] = useState(true);
  // Pointer to local stream
  const [myStream, setMyStream] = useState();
  // Holds the peer connection object
  const [peer, setPeer] = useState(null);
  // Stores the list of streams as a state so that UI updates with new streams
  const [streamState, setStreams] = useState(streams.slice());

  // When a new user joins the room, attempt to connect
  const connectToNewUser = (newUserId, stream) => {
    // Call second user
    const call = peer.call(newUserId, stream);
    // Set second user stream on call answered
    call.on("stream", (newStream) => {
      // Add new stream to the list of streams
      addVideoStream(newUserId, newStream, false);
    });
  }

  // Adds a video stream to the list of video streams
  const addVideoStream = (newUserId, newStream, muted) => {
    if(!streams.some(e => e.stream === newStream)) {
      // Add new stream to list of streams if it isn't already
      streams.push({
        userId: newUserId,
        stream: newStream,
        muted: muted
      });
      // Update the streams state
      setStreams(streams.slice())
    }
  }

  // Need to use polling to ensure only single instances of connections are created
  useInterval(() => {
    // Establish the peer connection if it hasn't already
    if (peer === null && socket != null) {
      // Attempt peerjs connection
      const peer = new Peer(userId, {
        host: store.getState().serverUrl,
        port: 443,
        path: '/peerjs',
        secure: true,
      });
      setPeer(peer);

      // Open peer connection, and join the room once connected
      peer.on('open', (id) => {
        socket.emit(SocketEvents.JoinRoom, 'test-room', userId, store.getState().username);
      });
    }

    // In order for peer calls to work, need to get media after connections
    // been made, which will cause a slight delay before the user's camera
    // feed is displayed. May revisit how this works later to improve UX
    if (getStream && peer != null) {
      // Get the webcam and audio stream from the user device
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream) => {
        // Attach stream to video element
        addVideoStream(userId, stream, true);
        // Update pointer
        setMyStream(stream);

        // Setup peer event to receive calls
        peer.on("call", (call) => {
          // Answer the call with the stream and userId
          call.answer(stream, userId);
          // Setup peer event to receive media streams
          call.on("stream", (newStream) => {
            addVideoStream(call.peer, newStream, false);
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
          })
          setStreams(streams);
        });
      });
      // Ensure media stream isn't requested again
      setStream(false);
    }
  }, 100);

  return (
    <div className="video_section_container">
      {streamState.map((stream, index) => {
          return (
              <VideoFrame
              key={index}
              stream={stream.stream}
              userId={stream.userId}
              muted={stream.muted}
              />
          )
      })}
      <VideoButtons socket={socket} peer={peer} stream={myStream} />
    </div>
  )
}

export default VideoSection
