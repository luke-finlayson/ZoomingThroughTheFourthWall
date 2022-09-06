import { useState } from 'react';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import LeaveRoomButton from './LeaveRoomButton';
import { store } from '../../store/store';
import CopyIcon from '../../resources/images/copy.svg';
import { useInterval } from '../../Utilities/useInterval';
import EditVideo from './EditVideo';

// Renders a 25px high vertical bar
const VerticalSeparator = () => {
  return(
      <div className="vertical_separator"></div>
  );
}

// Renders a row of control buttons at the top of the room page
const VideoButtons = ({ socket, peer, stream, selectedUser, setSelectedUser, setShowPopup, toggleScreenSharing }) => {

  // Counter to hide 'copied!' message after 3 seconds
  const [hideCounter, setHideCounter] = useState(0);

  useInterval(() => {
    if (hideCounter !== 0) {
      setHideCounter(hideCounter - 1);
    }
  }, 500)

  return (
    <div className="video_buttons_container">
      
      <div className="control_buttons control_button_container">

        {/* Don't show mic and camera buttons if user stream doesn't exist*/}
        {stream &&
          <MicButton stream={stream} />}
        {stream &&
          <VerticalSeparator />}
        {stream &&
          <CameraButton stream={stream} />}
        {stream &&
          <VerticalSeparator />}

        <SwitchToScreenSharingButton toggleScreenSharing={toggleScreenSharing} />
      </div>

      {selectedUser && <EditVideo setSelectedUser={setSelectedUser} setShowPopup={setShowPopup} />}
      
      <div className="management_buttons">
        <div class="mgb_main control_button_container">
          <LeaveRoomButton socket={socket} peer={peer} stream={stream} />
          
          <p className="room_name">{store.getState().roomId}</p>
          <img className="copy_icon_img" src={CopyIcon} 
          alt="Copy Room Name" 
          onClick={
            () => {
              // Copy room name to client clipboard
              navigator.clipboard.writeText(store.getState().roomId);
              setHideCounter(3);
            }
          }/>
        </div>

        {(hideCounter !== 0) && <div className='copied_message'>
          <p>Copied!</p>
        </div>}
      </div>
    
    </div>
  );
}

export default VideoButtons;
