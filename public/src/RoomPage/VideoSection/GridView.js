import { createRef, useEffect, useState } from "react";
import useDetermineLayout from "../../Utilities/useDetermineLayout"
import VideoFrame from "./VideoFrame";

// Renders the array of user streams in a grid layout
const GridView = ({ 
    streams, 
    streamsState,
    selectedUser, 
    setSelectedUser,
    updateStreamDimensions
}) => {
    const videoContainerRef = createRef()
    const [containerWidth, setWidth] = useState()
    const [containerHeight, setHeight] = useState()

    // Determine optimal height of video elements
    const { height } = useDetermineLayout(streams, containerWidth, containerHeight)

    useEffect(() => {
        if (videoContainerRef && videoContainerRef.current && !containerWidth) {
          // Intialise container width and height once video container has been rendered
          setWidth(videoContainerRef.current.clientWidth)
          setHeight(videoContainerRef.current.clientHeight)
        }
      }, [videoContainerRef])

    return (
        <div className="video-stream-container" ref={videoContainerRef}>
            {streamsState.map((user, index) => {
                return (
                    <VideoFrame
                    key={index}
                    user={user}
                    height={height - 10}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    updateStreamDimensions={updateStreamDimensions}
                    />
                )
            })}
        </div>
    )
}

export default GridView