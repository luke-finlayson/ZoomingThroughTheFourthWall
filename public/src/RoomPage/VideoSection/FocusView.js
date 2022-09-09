import VideoFrame from "./VideoFrame"
import CollapseIcon from '../../resources/images/collapse.svg'
import { createRef, useState } from "react"
import { useInterval } from "../../Utilities/useInterval";

let frames = []

// Renders the streams with the screen shares displayed front and centre
const FocusView = ({ 
    streamsState,
    selectedUser, 
    setSelectedUser,
    updateStreamDimensions,
    pinnedUser
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const videoContainerRef = createRef()
    const [framesState, setFrames] = useState(frames.slice())

    useInterval(() => {
        // Capture frames from pinned video at regular intervals
        if (pinnedUser) {
            // Locate the video element to get the image from
            const video = document.getElementById(pinnedUser);
            // Get the canvas element to display the image on
            const canvas = document.getElementById('previous_frame');

            // Match size of canvas with size of video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Put the current frame of the video on the canvas
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            frames.push(canvas.toDataURL())
            setFrames(frames.slice())
        }
        else {
            // Otherwise clear the previous frames
            frames = []
            setFrames(frames.slice())
        }
    }, 5000)

    return (
        <div className="video_focus_container" ref={videoContainerRef}>
            {streamsState.filter(user => user.userId === pinnedUser).map((screenShare, index) => {
                return (
                    <VideoFrame
                    key={index}
                    user={screenShare}
                    height={"100%"}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    updateStreamDimensions={updateStreamDimensions}
                    />
                )
            })}
            
            <canvas className="previousFrame" id="previous_frame" hidden></canvas>

            <div class="frames">
                {framesState.map((frame, index) => {
                    return (
                        <img src={frame} alt={index} />
                    )
                })}
            </div>

            <div className="video_small_carousel" style={collapsed ? {left: "-242px"} : {left: "10px"}}>
                <div className="carousel_collapse_button" onClick={() => setCollapsed(!collapsed)}>
                    <img 
                    className={collapsed ? "flipped_X" : "not_flipped_X"}
                    src={CollapseIcon} />
                </div>
                {streamsState.filter(user => user.userId !== pinnedUser).map((screenShare, index) => {
                    return (
                        <VideoFrame
                        key={index}
                        user={screenShare}
                        height={"auto"}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        updateStreamDimensions={updateStreamDimensions}
                        />
                    )
                })}
            </div>

            {!pinnedUser && <div className="none_pinned_message">
                <h1>No Pinned Video</h1>
                <p>Select a video to pin it</p>
            </div>}
        </div>
    )
}

export default FocusView