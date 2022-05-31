import React, { useState, useEffect } from 'react';
import { store } from '../../store/store';
import { useInterval } from './useInterval';

const VideoFrame = ({stream, userId}) => {

  const [isScreenSharing, setScreenSharing] = useState(false);

  // Check status of screen s
  useInterval(() => {
    // Get the state of the store
    const state = store.getState();

    // Only do something if the state of screen sharing has changed
    if (isScreenSharing != state.isScreenSharing) {
      // Toggle screen sharing
      setScreenSharing(state.isScreenSharing);

      if(!isScreenSharing) {
        // Get stream from screen
        navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        }).then((stream) => {
          // Attach stream to video element
          const video = document.getElementById(userId);
          video.srcObject = stream;
          // Ensure video is not flipped
          video.style.transform = "rotateY(0deg)"
          video.addEventListener('loadedmetadata', () => {
            video.play();
          });
        });

        console.log("Now sharing screen");
      }
      else {
        // Attach stream to video element
        const video = document.getElementById(userId);
        video.srcObject = stream;
        // Flip video
        video.style.transform = "rotateY(180deg)"
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    }
  }, 1000);

  useEffect(() => {
    // Attach stream to video element
    const video = document.getElementById(userId);
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
  });

  // Display message until the stream is ready
  return (
    <video id={userId} />
  );
}

export default VideoFrame;
