import React, {useState} from 'react'

import MicButtonImg from '../../resources/images/mic.svg'
import MicButtonImgOff from '../../resources/images/micOff.svg'
import { unmountComponentAtNode } from 'react-dom';

const MicButton = ({ room }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handelmicButtonPressed = () => {
    isMicMuted ? unmute() : mute();
    setIsMicMuted(!isMicMuted);
  }

  const mute = () => {
    // Mute microphone
  }

  const unmute = () => {

  }
  
  
  return ( 
    <div className='video_button_container'>
      <img src={isMicMuted ? MicButtonImgOff : MicButtonImg} alt="" 
      onClick={handelmicButtonPressed}
      className='video_button_image'
      />
    </div>
  )
}

export default MicButton
