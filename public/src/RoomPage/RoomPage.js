import React, { useState, useEffect } from 'react'
import './RoomPage.css';
import './RoomPage.css';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import ChatSection from './ChatSection/ChatSection';
import io from 'socket.io-client';
import { store } from '../store/store';
import { useInterval } from './VideoSection/useInterval';
import { useNavigate } from 'react-router-dom';

// Entry point and interface of our room page
const RoomPage = () => {

  // Get user id from the store
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the state of the store
    const state = store.getState();
    // Return to home page if user has no username
    if (state.username === null || state.username === "") {
      navigate("/");
    }
  })

  // Use polling to establish socket connection
  useInterval(() => {
    // Establish the socket connection if it hasn't already
    if (socket === null) {
      // Attempt to create socket connection
      const socket = io("https://localhost:443/");
      setSocket(socket);
    }
  }, 100);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection socket={socket} />
      <ChatSection socket={socket}/>
    </div>
  )
}

export default RoomPage;
