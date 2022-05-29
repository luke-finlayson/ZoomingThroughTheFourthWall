import React, {useState} from 'react'

import SwitchImg from '../../resources/images/switchToScreenSharing.svg'

const SwitchToScreenSharingButton = () => {
  
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  
  const handleScreenSharingEnable = () => {
    // enable screen sharing logic here
  }

  return (
    <div className='video_button_container'>
      <img src={SwitchImg} alt=""
      onClick={handleScreenSharingEnable}
      className='video_button_image'/>
    </div>
  )
}

export default SwitchToScreenSharingButton
