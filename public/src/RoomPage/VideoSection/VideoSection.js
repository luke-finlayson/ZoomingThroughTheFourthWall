import React, {useState, useEffect} from 'react';
import VideoButtons from './VideoButtons';
import VideoFrame from './VideoFrame';
import * as uuid from 'uuid';
import io from 'socket.io-client';
import {store} from '../../store/store';

const VideoSection = () => {

  // Room will be set by backend server
  const userId = store.getState().userId;
  const [myStream, setMyStream] = useState();

  if (myStream == null) {
    // Get the webcam and audio stream from the user device
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then((stream) => {
      // Attach stream to video element
      setMyStream(stream);
    })
  }

  /*useEffect(() => {
    const socket = io("http://localhost:8080/");
    console.log(socket);

    /*import('peerjs').then(() => {
      const peer = new Peer(userId, {
        host: 'localhost',
        port: 8080,
        path: '/peerjs'
      });
    });
  });*/

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
