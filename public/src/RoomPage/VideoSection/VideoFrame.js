import { useEffect, useMemo, createRef } from 'react';

const VideoFrame = ({ 
    user, 
    selectedUser,
    setSelectedUser,
    updateStreamDimensions,
    height
  }) => {

  const video = createRef();

  // Attaches source media to a given video element
  const setVideoSource = (source, video) => {
    video.srcObject = source;

    // Add event listener to play video once stream has loaded
    video.addEventListener('loadedmetadata', () => {
      updateStreamDimensions(user.userId, video.videoWidth, video.videoHeight)
      video.play();
    });
  }

  // Select this video frame when the user clicks on it
  const selectFrame = () => {
    if (selectedUser === user.userId) {
      setSelectedUser(null);
      return;
    }

    setSelectedUser(user.userId)
  }

  useEffect(() => {
    // Locate video element and attach stream if it exists
    if (video.current) {
      setVideoSource(user.stream, video.current);
    }
    else {
      console.log("Failed to locate user video element")
    }
  }, [user.stream]);

  // function handleKeyDown(event) {

  // 	if (event.key === 'a') {
  // 	    console.log(`Move video id=${userId} Left`);

  // 	    video.current.style.visibility = "hidden";
  // 	    //video.style.transform = "rotateY(180deg) scale(1.2,1.2) translate(12%,0%);";
  // 	}
  // 	else if (event.key === 'd') {
  // 	    console.log(`Move video id=${userId} Right`);
  // 	    video.current.style.visibility = "visible";
  // 	}
  // 	else if (event.key ==='w') {
  // 	    console.log(`Move video id=${userId} Up`);
  // 	}
  // 	else if (event.key === 's') {
  // 	    console.log(`Move video id=${userId} Down`);
  // 	}
  // }

  // Return the video and its container via the useMemo function to prevent flickering on state updates
  const renderVideo = useMemo(() => {
    return (
      <video 
        className="video-frame-elem" 
        id={user.userId} 
        muted={user.muted} 
        ref={video} 
        style={user.isDisplayMedia ? {transform: "scaleX(1)"} : {transform: "scaleX(-1)"}}
      />
    );
  }, [user.userId, user.muted, user.stream])

  // Display message until the stream is ready
  return (
    <div className={selectedUser !== user.userId ? "video-frame-container" : "video-frame-container selected_video"} 
      style={{height: height, aspectRatio: user.width + " / " + user.height}}
      onClick={selectFrame}>
      {renderVideo}
    </div>
  );
}

export default VideoFrame;
