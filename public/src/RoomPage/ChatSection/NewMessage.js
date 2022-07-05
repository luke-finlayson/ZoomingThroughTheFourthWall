import React, { useState } from 'react'
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import SocketEvents from '../socketevents';

const NewMessage = ({ socket }) => {

    const [message, setMessage] = useState("");

    const sendMessage = () => {
        // Send message to server
        socket.emit(SocketEvents.NewMessage, message);
        setMessage('');
    }

    const handleKeyPressed = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault();
            // sendMessage to other user
            sendMessage();
        }
    }

    const handleTextChange = (event) => {
        setMessage(event.target.value);
    }


  return (
    <div className="new_message_container">
      <input
      className="new_message_input"
      value={message}
      onChange={handleTextChange}
      placeholder="Type your message"
      type="text"
      onKeyDown={handleKeyPressed}
       />
       <img className="new_message_button" src={SendMessageButton} onClick={sendMessage} alt="Send"/>
    </div>
  )
}

export default NewMessage
