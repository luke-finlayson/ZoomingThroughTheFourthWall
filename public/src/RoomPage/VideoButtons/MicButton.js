import React, {useState} from 'react'

import MicOnImg from '../../resources/images/micOn.svg'
import MicOffImg from '../../resources/images/micOff.svg'

const MicButton = ({ room, stream }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handelmicButtonPressed = () => {
    isMicMuted ? unmute() : mute();
    setIsMicMuted(!isMicMuted);
  }

  const mute = () => {
    // Mute microphone
    stream.getAudioTracks()[0].enabled = false;
  }

  const unmute = () => {
    // Unmute microphone
    stream.getAudioTracks()[0].enabled = true;
  }


  return (
    <div className='video_button_container'>
      <img src={isMicMuted ? MicOffImg : MicOnImg} alt=""
      onClick={handelmicButtonPressed}
      className='video_button_image'
      />
    </div>
  )
}

export default MicButton
