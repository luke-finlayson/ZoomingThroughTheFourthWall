import React, {useState, useEffect} from 'react';
import {store} from '../../store/store';

const VideoFrame = ({stream, userId}) => {

  // Place stream into state so it can be changed between camera and screen
  const [thisStream, setStream] = useState();

  // Subscribe to store updates
  const unsubscribe = store.subscribe(() => {
    // Get state of store
    const state = store.getState();

    if (state.isScreenSharing) {
      // Get display stream
      navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      }).then((displayStream) => {
        setStream(displayStream);
      })
    }
    else {
      // If screen charing was disabled, switch back to the original stream
      setStream(stream);
    }

    console.log(thisStream);
  });

  useEffect(() => {
    // Move stream to state
    setStream(stream);

    // Attach stream to video element
    const video = document.getElementById(userId);
    video.srcObject = thisStream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    })

  });

  // Display message until the stream is ready
  return (
    <video id={userId} />
  );
}

export default VideoFrame;
