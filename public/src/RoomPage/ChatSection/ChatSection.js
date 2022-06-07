import React from 'react';
import ChatLabel from './ChatLabel';
import Messages from './Messages';
import NewMessage from './NewMessage';
import { store } from '../../store/store';

const ChatSection = ({ socket }) => {

  return (
    <div className="chat_section_container">
        <p className="room-id">{store.getState().roomId}</p>
        <ChatLabel />
        <Messages socket={socket} />
        <NewMessage socket={socket} />
    </div>
  )
}

export default ChatSection
