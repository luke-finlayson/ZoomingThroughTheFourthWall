import React, { useState, useEffect } from 'react';
import VideoButtons from './VideoButtons';
import VideoFrame from './VideoFrame';
import * as uuid from 'uuid';
import io from 'socket.io-client';
import { store } from '../../store/store';
import { useInterval } from './useInterval';
import { Peer } from 'peerjs';

const VideoSection = ({socket}) => {

  // Unique id of this user
  const userId = store.getState().userId;
  const [myStream, setMyStream] = useState(null);
  const [peer, setPeer] = useState(null);

  // Need to use polling to ensure only single instances of connections are created
  useInterval(() => {
    // Establish the peer connection if it hasn't already
    if (peer === null && socket != null) {
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

    // In order for peer calls to work, need to get media after connections
    // been made, which will cause a slight delay before the user's camera
    // feed is displayed. May revisit how this works later to improve UX
    if (myStream === null && peer != null) {
      // Get the webcam and audio stream from the user device
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream) => {
        // Attach stream to video element
        setMyStream(stream);
      })
    }

  }, 1000);

  return (
    <div className="video_section_container">
      <VideoFrame
        stream={myStream}
        userId={userId}
        muted={true}
      />
      <VideoButtons />
    </div>
  )
}

export default VideoSection
