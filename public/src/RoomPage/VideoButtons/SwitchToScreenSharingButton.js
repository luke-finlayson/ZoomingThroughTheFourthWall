import React, {useState} from 'react'
import ShareOnImg from '../../resources/images/shareOn.svg';
import ShareOffImg from '../../resources/images/shareOff.svg'
import {store} from '../../store/store';
import TextOnOff from './TextOnOff';

const SwitchToScreenSharingButton = () => {

  const handleScreenSharingEnable = () => {
    // Get states from store
    const state = store.getState();
    // Toggle value of screen sharing
    store.dispatch({ type: 'SET_SCREEN_SHARING', payload: !state.isScreenSharing })
  }

  return (
    <div className='video_button_container' onClick={handleScreenSharingEnable}>
      <img src={store.getState().isScreenSharing ? ShareOnImg : ShareOffImg} alt=""
      className='video_button_image'/>

      <TextOnOff on={store.getState().isScreenSharing} />
    </div>
  )
}

export default SwitchToScreenSharingButton
