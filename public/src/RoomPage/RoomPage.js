import React, { useState } from 'react'
import './RoomPage.css';
import './RoomPage.css';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import ChatSection from './ChatSection/ChatSection';
import io from 'socket.io-client';
import { store } from '../store/store';
import { useInterval } from './VideoSection/useInterval';

// Entry point and interface of our room page
const RoomPage = () => {

  // Get user id from the store
  const userId = store.getState().userId;
  const [socket, setSocket] = useState(null);

  // Use polling to establish socket connection
  useInterval(() => {
    // Establish the socket connection if it hasn't already
    if (socket === null) {
      // Attempt to create socket connection
      const socket = io("https://localhost:8080/");
      setSocket(socket);
    }
  }, 1000);

  return (
    <div className="room_container">
      {/* Consists of three components */}
      <ParticipantsSection />
      <VideoSection socket={socket} />
      <ChatSection socket={socket}/>

    </div>
  )
}

export default RoomPage;
