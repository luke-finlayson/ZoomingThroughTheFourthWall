import { useState } from 'react';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import LeaveRoomButton from './LeaveRoomButton';
import { store } from '../../store/store';
import CopyIcon from '../../resources/images/copy.svg'
import { useInterval } from '../useInterval';

const VideoButtons = ({ socket, peer, stream }) => {

  // Counter to hide 'copied!' message after 3 seconds
  const [hideCounter, setHideCounter] = useState(0);

  useInterval(() => {
    if (hideCounter !== 0) {
      setHideCounter(hideCounter - 1);
    }
  }, 1000)

  return (
    <div className="video_buttons_container">
      <div className="toggle_buttons control_button_container">
        <MicButton stream={stream} />
        <CameraButton stream={stream} />
        <SwitchToScreenSharingButton />
      </div>
      <div className="management_buttons control_button_container">
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
        {(hideCounter === 0) && <div className='copied_message'>
          <p>Copied!</p>
        </div>}
      </div>
    </div>
  );
}

export default VideoButtons;
