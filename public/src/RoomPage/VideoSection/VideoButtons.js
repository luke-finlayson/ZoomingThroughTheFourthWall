import React from 'react'
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import LeaveRoomButton from './LeaveRoomButton';

const VideoButtons = ({ socket, peer, stream }) => {

  return (
    <div className="video_buttons_container">
        <MicButton />
        <CameraButton />
        <LeaveRoomButton socket={socket} peer={peer} stream={stream} />
        <SwitchToScreenSharingButton />

    </div>
  )
}

export default VideoButtons;
