import React, {useState} from 'react'

// Import icons
import CameraButtonImg from '../../resources/images/camera.svg'
import CameraButtonImgOff from '../../resources/images/cameraOff.svg'

const CameraButton = () => {

  const[isLocalVideoTrackDisabled, setIsLocalVideoTrackDisabled] = useState(false);

  const handleCameraButtonPressed = () => {
    isLocalVideoTrackDisabled ? stopVideo() : startVideo();

    setIsLocalVideoTrackDisabled(!isLocalVideoTrackDisabled);
  }

  const startVideo = () => {
    // Logic to start camera video to other users
  }

  const stopVideo = () => {
    // Logic to stop camera video to other users
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
