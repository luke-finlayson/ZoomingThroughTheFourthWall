import { useState } from 'react';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import LeaveRoomButton from './LeaveRoomButton';
import { store } from '../../store/store';
import CopyIcon from '../../resources/images/copy.svg';
import { useInterval } from '../../Utilities/useInterval';
import EditVideo from './EditVideo';
import IconWithTextButton from '../../resources/images/IconWithTextButton';
import VerticalSeparator from './VerticalSeparator';

let gridSvg = ["M175.23,97.57c-8.66,0-17.33,.23-25.98-.05-12.29-.4-22.43-10.67-22.58-22.99-.21-17.08-.22-34.16,0-51.23,.17-12.89,10.59-22.92,24.06-23.11,16.4-.24,32.82-.25,49.22,0,14.21,.22,24.12,10.63,24.14,24.85,.03,15.91,.03,31.82,0,47.74-.03,14.35-10.01,24.58-24.38,24.85-8.16,.16-16.32,.03-24.49,.03,0-.03,0-.05,0-.08Zm32.87-48.65c0-7.83,0-15.66,0-23.5,0-6.12-3.1-9.28-9.19-9.29-15.74-.02-31.49-.03-47.23,0-5.92,.01-9.08,3.22-9.08,9.15,0,15.75,0,31.5,0,47.24,0,5.97,3.08,9.1,9.07,9.11,15.83,.03,31.66,.03,47.48,0,5.85-.01,8.94-3.16,8.95-8.98,.01-7.92,0-15.83,0-23.75Z",
"M48.62,97.58c-8.58,0-17.16,.22-25.73-.05C10.31,97.12,.23,86.79,.12,74.2c-.15-16.83-.15-33.66,0-50.48C.23,10.54,10.61,.36,24.28,.18c16.32-.22,32.65-.21,48.97,0,14.31,.18,24.29,10.59,24.32,24.94,.03,15.83,.03,31.66,0,47.49-.02,14.64-10.06,24.84-24.72,25.04-8.08,.11-16.16,.02-24.24,.02,0-.03,0-.05,0-.08Zm-.11-15.93c8,0,15.99,.03,23.99,0,6-.03,9.07-3.13,9.07-9.11,.01-15.75,.01-31.5,0-47.24,0-5.94-3.15-9.14-9.08-9.15-15.74-.03-31.49-.02-47.23,0-6.07,0-9.19,3.19-9.2,9.28,0,15.66,0,31.33,0,46.99,0,6.13,3.05,9.21,9.2,9.23,7.75,.03,15.49,0,23.24,0Z",
"M48.88,122.42c8.66,0,17.33-.22,25.98,.05,12.34,.39,22.46,10.56,22.63,22.92,.23,17.08,.23,34.16,0,51.23-.17,13.03-10.65,23.02-24.25,23.2-16.24,.2-32.49,.19-48.72,0-14.44-.16-24.44-10.57-24.46-25.07-.02-15.83-.02-31.66,0-47.49,.02-14.48,10.04-24.69,24.57-24.92,8.08-.13,16.16-.02,24.24-.02,0,.03,0,.05,0,.08Zm-32.81,48.52c0,8-.01,16,0,24,.01,5.6,3.2,8.9,8.8,8.92,15.99,.05,31.99,.05,47.98,0,5.49-.02,8.71-3.32,8.71-8.75,.02-16,.02-32,0-47.99,0-5.46-3.19-8.72-8.68-8.74-16.08-.05-32.16-.05-48.23,0-5.46,.02-8.58,3.31-8.59,8.83-.02,7.92,0,15.83,0,23.75Z",
"M175.4,122.42c8.66,0,17.33-.22,25.98,.05,12.45,.4,22.52,10.66,22.66,23.16,.19,16.91,.18,33.82,0,50.73-.13,13.17-10.56,23.28-24.26,23.45-16.32,.21-32.65,.23-48.97,0-14.22-.21-24.18-10.61-24.22-24.79-.04-16-.04-31.99,0-47.99,.04-14.08,9.96-24.31,24.06-24.65,8.24-.2,16.49-.04,24.74-.04,0,.02,0,.04,0,.06Zm.16,15.92c-7.91,0-15.83-.02-23.74,0-6.15,.02-9.22,3.11-9.23,9.21,0,15.66,0,31.33,0,46.99,0,6.12,3.1,9.3,9.18,9.31,15.66,.03,31.32,.02,46.98,0,6.29,0,9.34-3.1,9.35-9.39,0-15.58,0-31.16,0-46.74,0-6.32-3-9.36-9.3-9.38-7.75-.02-15.49,0-23.24,0Z"]

let focusSvg = ["M.02,51.74c0-7.38,.03-14.76,0-22.14C-.08,13.53,12.98,.14,29.11,.05c15.75-.09,31.51,0,47.26,.09,7.27,.05,12.74,5.24,13.03,12.11,.31,7.4-5.3,13.22-13.07,13.27-14.26,.09-28.52,.02-42.77,.03-7.68,0-8.02,.35-8.02,8.15,0,14.26,.08,28.52-.04,42.78-.08,9.04-8.26,15.01-16.61,12.33C3.71,87.16,.21,82.55,.14,76.87c-.1-8.38-.03-16.75-.03-25.13-.03,0-.07,0-.1,0Z",
"M255.29,51.89c0,8.48,.13,16.96-.04,25.43-.13,6.28-5.01,11.33-11.19,12.06-6.12,.72-12.04-3.2-13.66-9.21-.43-1.6-.47-3.35-.48-5.03-.04-13.06-.02-26.13-.02-39.19,0-1,0-1.99,0-2.99-.03-6.81-.59-7.38-7.28-7.39-9.67-.01-19.34,0-29.01,0-4.79,0-9.57,.05-14.36-.02-7.7-.11-13.28-5.57-13.22-12.84,.06-7.12,5.63-12.52,13.19-12.56,15.75-.09,31.51-.22,47.26-.07,16.2,.15,29.06,13.54,28.94,29.69-.06,7.38,0,14.76,0,22.14-.04,0-.07,0-.11,0Z",
"M51.93,255.38c-8.17,0-16.37,.35-24.52-.08C12.06,254.48,.09,241.65,.03,226.3c-.06-15.76-.03-31.51,.1-47.27,.08-9.03,8.25-15,16.61-12.33,5.46,1.75,8.76,6.47,8.78,12.84,.04,14.16,.01,28.32,.02,42.48,0,7.53,.41,7.94,7.93,7.94,14.36,0,28.72-.08,43.07,.04,9.01,.08,14.95,8.35,12.22,16.68-1.69,5.16-6.29,8.6-12.01,8.67-8.27,.1-16.55,.03-24.83,.02Z",
"M255.33,203.53c0,8.08,.32,16.17-.07,24.23-.75,15.45-13.27,27.52-28.7,27.68-15.95,.17-31.91,.08-47.86-.09-8.94-.1-14.83-8.57-11.99-16.85,1.81-5.29,6.51-8.5,12.74-8.52,14.06-.04,28.12-.01,42.18-.02,7.95,0,8.26-.31,8.27-8.21,0-14.26-.08-28.52,.04-42.78,.08-9.01,8.32-14.97,16.65-12.26,5.17,1.68,8.62,6.27,8.69,11.99,.1,8.28,.03,16.55,.03,24.83h.02Z"]

// Renders a row of control buttons at the top of the room page
const VideoButtons = ({ 
  socket, 
  peer, 
  stream, 
  selectedUser, 
  setSelectedUser, 
  setShowPopup, 
  toggleScreenSharing,
  displayMode,
  setDisplayMode,
  pinVideo,
  userIsPinned
}) => {

  // Counter to hide 'copied!' message after 3 seconds
  const [hideCounter, setHideCounter] = useState(0);

  useInterval(() => {
    if (hideCounter !== 0) {
      setHideCounter(hideCounter - 1);
    }
  }, 500)

  return (
    <div className="video_buttons_container">
      
      <div className='left_control_button_container'>
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

        <div className='control_buttons control_button_container left_margin'>
          <IconWithTextButton svgPaths={gridSvg} enabled={displayMode === "grid"} 
            onClick={() => setDisplayMode("grid")} viewBox="0 0 224.18 219.99" />

          <VerticalSeparator />

          <IconWithTextButton svgPaths={focusSvg} enabled={displayMode === "focus"}
            onClick={() => setDisplayMode("focus")} viewBox="0 0 255.45 255.53" />
        </div>
      </div>

      {selectedUser && 
        <EditVideo setSelectedUser={setSelectedUser} 
          setShowPopup={setShowPopup} 
          pinVideo={pinVideo}
          userIsPinned={userIsPinned} />}
      
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
