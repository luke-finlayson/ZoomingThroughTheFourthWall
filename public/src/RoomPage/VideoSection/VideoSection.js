import React, { useState, useEffect } from 'react';
import VideoButtons from './VideoButtons';
import VideoFrame from './VideoFrame';
import * as uuid from 'uuid';
import io from 'socket.io-client';
import { store } from '../../store/store';
import { useInterval } from './useInterval';
import { Peer } from 'peerjs';

const VideoSection = () => {

  // Unique id of this user
  const userId = store.getState().userId;
  const [myStream, setMyStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);

  useInterval(() => {
    // If user stream hasn't been set, get it
    if (myStream === null) {
      // Get the webcam and audio stream from the user device
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream) => {
        // Attach stream to video element
        setMyStream(stream);
      })
    }

    // Establish the socket connection
    if (socket === null) {
      // Attempt to create socket connection
      const socket = io("https://localhost:8080/");
      setSocket(socket);

      
    }

    // Establish the peer connection
    if (peer === null) {
      // Attempt peerjs connection
      const peer = new Peer(userId, {
        host: 'localhost',
        port: 8080,
        path: '/peerjs',
        secure: true,
      });
      setPeer(peer);

      peer.on('open', (id) => {
        socket.emit('join-room', 'test-room', userId);
      })
    }

  }, 1000);

  return (
    <div className="video_section_container">
      <VideoFrame
        stream={myStream}
        userId={userId}
      />
      <VideoButtons />
    </div>
  )
}

export default VideoSection
