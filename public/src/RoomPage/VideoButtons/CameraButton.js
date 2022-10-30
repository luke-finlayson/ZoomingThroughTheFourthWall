import React, {useState} from 'react'
import IconWithTextButton from '../../resources/images/IconWithTextButton';
import TextOnOff from './TextOnOff'

let cameraSvg = ['M29.4,9.9v14c0,0,0,0,0,0.1c-0.4,1.7-1.5,2.7-3.3,2.7c-7.4,0-14.8,0-22.2,0c-0.2,0-0.5,0-0.7,0c-1.6-0.3-2.7-1.6-2.7-3.2c0-4.3,0-8.7,0-13c0-2,1.4-3.3,3.3-3.3c1.1,0,2.3,0,3.4,0c0.1,0,0.2,0,0.3,0c0-0.3,0-0.7,0-1c0-1.8,1.2-3,2.9-3c2.9,0,5.8,0,8.8,0c0.3,0,0.5,0,0.8,0.1c1.3,0.4,2.1,1.4,2.1,2.8c0,0.3,0,0.7,0,1c0.1,0,0.2,0,0.4,0c1.2,0,2.5,0,3.7,0c1.3,0,2.5,1,2.9,2.3C29.3,9.6,29.4,9.8,29.4,9.9L29.4,9.9z M15,24c3.9,0,7.1-3.2,7-7.1c0-3.9-3.2-7.1-7.1-7c-3.9,0-7.1,3.2-7,7.1C8,20.9,11.2,24,15,24L15,24z',
'M19.7,16.9c0,2.5-2.1,4.6-4.6,4.7c-2.6,0-4.7-2.1-4.7-4.6c0-2.5,2.1-4.6,4.6-4.7S19.6,14.3,19.7,16.9L19.7,16.9z']

const CameraButton = ({ stream }) => {

  const[isLocalVideoTrackDisabled, setIsLocalVideoTrackDisabled] = useState(false);

  const handleCameraButtonPressed = () => {
    isLocalVideoTrackDisabled ? startVideo() : stopVideo();

    setIsLocalVideoTrackDisabled(!isLocalVideoTrackDisabled);
  }

  const startVideo = () => {
    // Logic to start camera video to other users
    stream.getVideoTracks()[0].enabled = true;
  }

  const stopVideo = () => {
    // Logic to stop camera video to other users
    stream.getVideoTracks()[0].enabled = false;
  }

  return (
    <IconWithTextButton svgPaths={cameraSvg} enabled={!isLocalVideoTrackDisabled} onClick={handleCameraButtonPressed} viewBox="0 0 30 30" />
  )
}

export default CameraButton
