import React, {useState} from 'react'
// Import icons
import CameraOffImg from '../../resources/images/cameraOff.svg'
import CameraOnImg from '../../resources/images/cameraOn.svg'
import TextOnOff from './TextOnOff'

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
    <div className='video_button_container' onClick={handleCameraButtonPressed}>
      <img src={isLocalVideoTrackDisabled ? CameraOffImg : CameraOnImg} alt=""
      className='video_button_image'/>

      <TextOnOff on={!isLocalVideoTrackDisabled}/>
    </div>
  )
}

export default CameraButton
