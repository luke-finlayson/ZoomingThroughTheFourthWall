import React, { createRef, useState } from 'react'
import SendMessageButton from "../../resources/images/rightArrow.svg";
import SocketEvents from '../../Utilities/socketevents';

const NewMessage = ({ socket, messageInput }) => {

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
      ref={messageInput}
      className="new_message_input"
      value={message}
      onChange={handleTextChange}
      placeholder="Type your message"
      type="text"
      onKeyDown={handleKeyPressed}
      />
      <div onClick={sendMessage} className="new_message_button">
        <img src={SendMessageButton} alt="Send" />
      </div>
    </div>
  )
}

export default NewMessage
