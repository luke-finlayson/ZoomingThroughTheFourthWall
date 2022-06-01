import React from 'react'
import ChatLabel from './ChatLabel'
import Messages from './Messages'
import NewMessage from './NewMessage'

const ChatSection = ({ socket }) => {

  return (
    <div className="chat_section_container">
        <ChatLabel />
        <Messages socket={socket} />
        <NewMessage socket={socket} />
    </div>
  )
}

export default ChatSection
