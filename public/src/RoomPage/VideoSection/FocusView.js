import VideoFrame from "./VideoFrame"

// Renders the streams with the screen shares displayed front and centre
const FocusView = ({ 
    streamsState,
    selectedUser, 
    setSelectedUser,
    updateStreamDimensions
}) => {

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
        </div>
    )
}

export default FocusView