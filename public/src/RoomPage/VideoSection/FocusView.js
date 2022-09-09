import VideoFrame from "./VideoFrame"
import CollapseIcon from '../../resources/images/collapse.svg'
import { useState } from "react"

// Renders the streams with the screen shares displayed front and centre
const FocusView = ({ 
    streamsState,
    selectedUser, 
    setSelectedUser,
    updateStreamDimensions
}) => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="video_focus_container">
            {streamsState.filter(user => user.isDisplayMedia).map((screenShare, index) => {
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
            
            <div className="video_small_carousel" style={collapsed ? {left: "-242px"} : {left: "10px"}}>
                <div className="carousel_collapse_button" onClick={() => setCollapsed(!collapsed)}>
                    <img 
                    className={collapsed ? "flipped_X" : "not_flipped_X"}
                    src={CollapseIcon} />
                </div>
                {streamsState.filter(user => !user.isDisplayMedia).map((screenShare, index) => {
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
        </div>
    )
}

export default FocusView