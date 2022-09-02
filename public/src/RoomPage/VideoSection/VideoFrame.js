import { useEffect, useMemo } from 'react';
import useWindowDimensions from '../../Utilities/useWindowDimensions';

const VideoFrame = ({ stream, userId, muted, setSelectedUser, setShowPopup, numStreams, selectedUser }) => {

  const { width, height } = useWindowDimensions();

  // Changes the video elements source to a given media stream.
  const setVideoSource = (source, video) => {
    // Attach stream to video element
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
    if (selectedUser === userId) {
      setSelectedUser(null);
      return;
    }

    setSelectedUser(userId)
    //setShowPopup(true);
  }

  useEffect(() => {
    // Locate video element and attach stream if it exists
    const video = document.getElementById(userId);
    if (video) {
      setVideoSource(stream, video);
    }
    else {
      console.log("Failed to locate user video element")
    }
  });

  function handleKeyDown(event) {

  	const video = document.getElementById(userId);

  	if (event.key === 'a') {
  	    console.log(`Move video id=${userId} Left`);

  	    video.style.visibility = "hidden";
  	    //video.style.transform = "rotateY(180deg) scale(1.2,1.2) translate(12%,0%);";
  	}
  	else if (event.key === 'd') {
  	    console.log(`Move video id=${userId} Right`);
  	    video.style.visibility = "visible";
  	}
  	else if (event.key ==='w') {
  	    console.log(`Move video id=${userId} Up`);
  	}
  	else if (event.key === 's') {
  	    console.log(`Move video id=${userId} Down`);
  	}
  }

  // Return the video and its container via the useMemo function to prevent flickering on state updates
  const renderVideo = useMemo(() => {
    return (
        <video className="video-frame-elem" id={userId} muted={muted} />
    )
  }, [userId, muted, stream])

  // Display message until the stream is ready
  return (
    <div className={selectedUser !== userId ? "video-frame-container" : "video-frame-container selected_video"} 
      style={{height: (height - 50) / (numStreams) + 'px'}}
      onClick={showPopup}>
      {renderVideo}
    </div>
  );
}

export default VideoFrame;
