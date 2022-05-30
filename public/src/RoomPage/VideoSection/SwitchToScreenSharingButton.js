import React, {useState} from 'react'
import SwitchImg from '../../resources/images/switchToScreenSharing.svg';
import {store} from '../../store/store';

const SwitchToScreenSharingButton = () => {

  const handleScreenSharingEnable = () => {
    // Get states from store
    const state = store.getState();
    // Toggle value of screen sharing
    store.dispatch({ type: 'SET_SCREEN_SHARING', payload: !state.isScreenSharing })
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
