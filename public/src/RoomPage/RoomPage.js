import React, { useEffect } from 'react'
import './RoomPage.css';
import VideoSection from './VideoSection/VideoSection';
import ChatSection from './ChatSection/ChatSection';
import { store } from '../store/store';

// Array to keep track of all connected streams
var streams = [];

// Entry point and interface of our room page
const RoomPage = ({ socket }) => {

  useEffect(() => {
    // Get the state of the store
    const state = store.getState();
    // Return to home page if user has no username
    if (state.username === null || state.username === "unnamed") {
      // Send the user back to the landing page
      window.location.replace(window.location.protocol + "//" + window.location.host);
    }
  })

  return (
    <div className="room_container">
      <VideoSection socket={socket} streams={streams} />
      <ChatSection socket={socket}/>
    </div>
  )
}

export default RoomPage;
