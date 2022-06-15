import React, {useState} from 'react'

// Import icons
import CameraButtonImg from '../../resources/images/camera.svg'
import CameraButtonImgOff from '../../resources/images/cameraOff.svg'

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
    <div className='video_button_container'>
      <img src={isLocalVideoTrackDisabled ? CameraButtonImgOff : CameraButtonImg} alt=""
      className='video_button_image'
      onClick={handleCameraButtonPressed}/>
    </div>
  )
}

export default CameraButton
