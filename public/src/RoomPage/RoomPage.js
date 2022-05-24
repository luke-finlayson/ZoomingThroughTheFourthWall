import React from 'react'
import './RoomPage.css'
import "./RoomPage.css"
import ParticipantsSection from './ParticipantsSection/ParticipantsSection'
import VideoSection from './VideoSection/VideoSection'
import ChatSection from './ChatSection/ChatSection'

// Entry point and interface of our room page
const RoomPage = () => {
  return (
    <div className="room_container">
      {/* Consists of three components */}
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      
    </div>
  )
}

export default RoomPage;
