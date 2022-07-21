import './IntroductionPage.css'
import ConnectButton from "./ConnectButton";
import { useInterval } from "../RoomPage/useInterval.js";
import { useState } from "react";
import { store } from '../store/store';
import { useNavigate } from 'react-router-dom';

const IntroductionPage = ({ socket }) => {

  const [socketConnected, setSocketConnected] = useState(false);
  const [formPosition, setFormPosition] = useState(0);

  const navigate = useNavigate();

  useInterval(() => {
    // Ensure socket is not null
    if (socket) {
      if (socket.connected) {
        // If the socket connection has been made, update state
        setSocketConnected(true);
      }
    }
  }, 100);

  const incrementPosition = () => {
    // Add 1 to position
    setFormPosition(formPosition + 1)

    // Check form position
    if (formPosition > 0) {
      // Join the room
      handleJoinToRoom();
    }
  }

  const handleJoinToRoom = () => {
      // Set Username
      //store.dispatch({ type: 'SET_USER_NAME', payload: nameValue });
      // Set new user id
      //store.dispatch({ type: 'SET_USER_ID', payload:  uuid.v4() });

      // Set the room name
      //store.dispatch({ type: 'SET_ROOM_ID', payload: roomIdValue });
      // Navigate to room page
      navigate('/room');
  }

  return (
    <div className='introduction_page_container'>
      <h1 className="logo_text">Fourth Wall</h1>

      {formPosition === 0 &&
        <ConnectButton socketConnected={socketConnected} incrementPosition={incrementPosition} />}
      {formPosition > 1 && <p>Enter data</p>}

    </div>
  );
};

export default IntroductionPage;
