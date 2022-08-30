import React, { useState, useEffect } from 'react';
import { store } from '../../store/store';
import { useInterval } from '../../Utilities/useInterval';

const VideoFrame = ({ stream, userId, muted, setSelectedUser, setShowPopup }) => {
  // Changes the video elements source to a given media stream.
  const setVideoSource = (source, flipped) => {
    // Attach stream to video element
    const video = document.getElementById(userId);
    video.srcObject = source;

    // Add event listener to play video once stream has loaded
    // (Even though technically react discourages event listeners like this,
    // it's still the simplest way to go about it)
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
  }

  // Updates the state to display a popup containing a snapshot of the current video frame
  const showPopup = () => {
    // Update the state to use this user as the selected user
    setSelectedUser(userId);
    // Update the state to show the popup
    setShowPopup(true);
  }

  useEffect(() => {
    // Attach stream to video element
    setVideoSource(stream, true);
  });

  function handleKeyDown(event) {

  	const video = document.getElementById(userId);

  	if (event.key == 'a') {
  	    console.log(`Move video id=${userId} Left`);

  	    video.style.visibility = "hidden";
  	    //video.style.transform = "rotateY(180deg) scale(1.2,1.2) translate(12%,0%);";
  	}
  	else if (event.key == 'd') {
  	    console.log(`Move video id=${userId} Right`);
  	    video.style.visibility = "visible";
  	}
  	else if (event.key == 'w') {
  	    console.log(`Move video id=${userId} Up`);
  	}
  	else if (event.key == 's') {
  	    console.log(`Move video id=${userId} Down`);
  	}
  }

  // Display message until the stream is ready
  return (
      <div className="video-frame-container">
	  <video className="video-frame-elem" id={userId} muted={muted}
		 onKeyDown={handleKeyDown}
	  />
    </div>
  );
}

export default VideoFrame;
