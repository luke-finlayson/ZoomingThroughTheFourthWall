import { useState } from 'react';
import ChatLabel from './ChatLabel';
import Messages from './Messages';
import NewMessage from './NewMessage';
import { store } from '../../store/store';
import { useInterval } from '../useInterval';

const ChatSection = ({ socket }) => {

  const [copyButtonText, setButtonText] = useState("Copy");

  // Reset button text every 8s
  useInterval(() => {
    // If the button text hs changed, reset it
    if (copyButtonText == "Copied!") {
      setButtonText("Copy");
    }
  }, 8000)

  return (
    <div className="chat_section_container">
        <p className="room-id">Room Name: {store.getState().roomId}</p>
        <button onClick={() => {
          // Copy room id
          navigator.clipboard.writeText(store.getState().roomId);
          // Update button text
          setButtonText("Copied!");
        }}>{copyButtonText}</button>
        <ChatLabel />
        <Messages socket={socket} />
        <NewMessage socket={socket} />
    </div>
  )
}

export default ChatSection
