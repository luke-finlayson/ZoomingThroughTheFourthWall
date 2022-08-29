import React, { useEffect } from 'react'
import './RoomPage.css';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import ChatSection from './ChatSection/ChatSection';
import { store } from '../store/store';
import { useNavigate } from 'react-router-dom';

// Entry point and interface of our room page
const RoomPage = ({ socket }) => {

  const navigate = useNavigate();

  useEffect(() => {
    // Get the state of the store
    const state = store.getState();
    // Return to home page if user has no username
    if (state.username === null || state.username === "") {
      navigate("/");
    }
  })

  return (
    <div className="room_container">
      <VideoSection socket={socket} />
      <ChatSection socket={socket}/>
    </div>
  )
}

export default RoomPage;
