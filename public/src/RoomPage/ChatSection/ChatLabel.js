import React from 'react'
import { store } from '../../store/store';
import SocketEvents from '../socketevents';
import CollapseIcon from '../../resources/images/collapse.svg';

const ChatLabel = ({ socket, collapsed, setCollapsed }) => {

  // Clears the messages from the database
  const clearMessages = () => {
    // Tell the server to remove the messages
    socket.emit(SocketEvents.ClearMessages);
  }

  return (
    <div className="chat_label_container">
        <p className="chat_label_paragraph">Messages</p>
        {(store.getState().isRoomHost && !collapsed)
          && <button onClick={clearMessages} >Clear</button>}
        <img className="chat_collapse_button" 
             onClick={() => setCollapsed(!collapsed)}
             src={CollapseIcon} />
    </div>
  )
}

export default ChatLabel
