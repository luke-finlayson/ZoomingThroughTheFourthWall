import React, {useState, useEffect} from 'react';
import VideoButtons from './VideoButtons';
import VideoFrame from './VideoFrame';
import * as uuid from 'uuid';
import io from 'socket.io-client';

const VideoSection = () => {

  // Room will be set by backend server
  const [myStream, setMyStream] = useState();
  // Need screen sharing state to be accessible by video section
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const userStream = true;
  const userId = uuid.v4();

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).then((stream) => {
    // Attach stream to video element
    if(myStream == null) {
      setMyStream(stream);
    }
  })

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

  // Function to pass to buttons to allow for changing state of screen sharing
  const setScreenSharing = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
    console.log("Screen sharing: " + isScreenSharingActive);
  }

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
