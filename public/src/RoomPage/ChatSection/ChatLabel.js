import React from 'react'
import { store } from '../../store/store';
import SocketEvents from '../socketevents';

const ChatLabel = ({ socket }) => {

  // Clears the messages from the database
  const clearMessages = () => {
    // Tell the server to remove the messages
    socket.emit(SocketEvents.ClearMessages);
  }

  return (
    <div className="chat_label_container">
        <p className="chat_label_paragraph">Chat</p>
        {store.getState().isRoomHost && <button onClick={clearMessages} >Clear</button>}
    </div>
  )
}

export default ChatLabel
