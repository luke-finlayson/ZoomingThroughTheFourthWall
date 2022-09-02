import { useEffect, useMemo, createRef } from 'react';

const VideoFrame = ({ 
    stream, 
    userId, 
    muted,
    selectedUser,
    setSelectedUser,
    height
  }) => {

  const video = createRef();

  // Changes the video elements source to a given media stream.
  const setVideoSource = (source, video) => {
    // Attach stream to video element
    video.current.srcObject = source;

    // Add event listener to play video once stream has loaded
    video.current.addEventListener('loadedmetadata', () => {
      video.current.play();
    });
  }

  // Updates the state to display a popup containing a snapshot of the current video frame
  const showPopup = () => {
    if (selectedUser === userId) {
      setSelectedUser(null);
      return;
    }

    setSelectedUser(userId)
  }

  useEffect(() => {
    // Locate video element and attach stream if it exists
    if (video.current) {
      setVideoSource(stream, video);
    }
    else {
      console.log("Failed to locate user video element")
    }
  });

  function handleKeyDown(event) {

  	if (event.key === 'a') {
  	    console.log(`Move video id=${userId} Left`);

  	    video.current.style.visibility = "hidden";
  	    //video.style.transform = "rotateY(180deg) scale(1.2,1.2) translate(12%,0%);";
  	}
  	else if (event.key === 'd') {
  	    console.log(`Move video id=${userId} Right`);
  	    video.current.style.visibility = "visible";
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
      <video className="video-frame-elem" id={userId} muted={muted} ref={video} />
    );
  }, [userId, muted, stream])

  // Display message until the stream is ready
  return (
    <div className={selectedUser !== userId ? "video-frame-container" : "video-frame-container selected_video"} 
      style={selectedUser !== userId ? {height: height + "px"} : {height: height + "px", zIndex: 2}}
      onClick={showPopup}>
      {renderVideo}
    </div>
  );
}

export default VideoFrame;
