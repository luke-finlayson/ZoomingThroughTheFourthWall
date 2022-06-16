import React, { useState, useEffect } from 'react';
import { store } from '../../store/store';
import { useInterval } from '../useInterval';

const VideoFrame = ({ stream, userId, muted, replaceStreams }) => {

  // Current value of screen sharing.
  // (For some weird reason this will actually be the opposite of the true value idk whats up)
  const [isScreenSharing, setScreenSharing] = useState(false);

  // Changes the video elements source to a given media stream.
  const setVideoSource = (source, flipped) => {
    // Attach stream to video element
    const video = document.getElementById(userId);
    video.srcObject = source;

    // Determine video orientation (Webcam streams should be flipped, screen shares shouldn't be)
    if (flipped) {
      video.style.transform = "rotateY(180deg)";
    } else {
      video.style.transform = "rotateY(0deg)";
    }

    // Add event listener to play video once stream has loaded
    // (Even though technically react discourages event listeners like this,
    // it's still the simplest way to go about it)
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });

    // Add event listener to switch video source back to original stream when
    // screen sharing ends
    video.addEventListener('ended', () => {
      if (!isScreenSharing) {
        // Switch stream back to default stream
        setVideoSource(stream, true);
        // Screen sharing has ended
        store.dispatch({ type: "SET_SCREEN_SHARING", payload: !store.getState().isScreenSharing });
      }
    });
  }

  // Use polling to check status of screen sharing
  useInterval(() => {
    // Get the state of the store
    const state = store.getState();

    // Only do something if the state of screen sharing has changed and this is the user's stream
    if (isScreenSharing !== state.isScreenSharing && muted) {
      // Toggle screen sharing
      setScreenSharing(state.isScreenSharing);

      if(!isScreenSharing) {
        // Get stream from screen
        navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        }).then((displayStream) => {
          // Change video source to display stream
          setVideoSource(displayStream, false);
          // Replace peer stream with the current stream
          replaceStreams(displayStream);
        });
      }
      else {
        // Change video source back to webcam
        setVideoSource(stream, true);
        replaceStreams(stream);
      }
    }
  }, 100);

  useEffect(() => {
    // Attach stream to video element
    setVideoSource(stream, true);
  });

  // Display message until the stream is ready
  return (
    <video id={userId} muted={muted} />
  );
}

export default VideoFrame;
