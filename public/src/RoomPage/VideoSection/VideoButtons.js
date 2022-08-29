import React from 'react';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import LeaveRoomButton from './LeaveRoomButton';
import { store } from '../../store/store';

const VideoButtons = ({ socket, peer, stream }) => {
  return (
    <div className="video_buttons_container">
      <div className="toggle_buttons">
        <MicButton stream={stream} />
        <CameraButton stream={stream} />
        <SwitchToScreenSharingButton />
      </div>
      <div className="management_buttons">
        <LeaveRoomButton socket={socket} peer={peer} stream={stream} />
        <p className="room_name">Room Name: {store.getState().roomId}</p>
      </div>
    </div>
  );
}

export default VideoButtons;
