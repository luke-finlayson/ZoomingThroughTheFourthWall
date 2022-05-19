import React from 'react'
import { connect } from 'react-redux'
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import LeaveRoomButton from './LeaveRoomButton';

const VideoButtons = (props) => {

    const {room, connectOnlyWithAudio } = props;
    

  return (
    <div className="video_buttons_container">
        <MicButton />
        {connectOnlyWithAudio && <CameraButton room={room} />}
        <LeaveRoomButton room={room} />
        <SwitchToScreenSharingButton room={room} />
      
    </div>
  )
}

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}

export default connect(mapStoreStateToProps)(VideoButtons);
