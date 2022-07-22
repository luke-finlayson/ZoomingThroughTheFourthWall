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

  // Increases the form position by
  const incrementPosition = () => {
    // Determine new form position
    let position = formPosition + 1

    // Check form position
    if (position > 2) {
      // Join the room
      handleJoinToRoom();
    }

    // Otherwise update position state
    setFormPosition(position)
  }

  // Set form position to 0
  const goHome = () => {
    setFormPosition(0)
  }
  // Set form position to 0
  const goToName = () => {
    setFormPosition(1)
  }
  // Set form position to 0
  const goToRoom = () => {
    setFormPosition(2)
  }

  // Ensures information provided is correct, and navigates to the room page
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

      <div className="progressTimeline">
        <button id="timelineButtonHoom"
          className={formPosition === 0 ? "timelineButton current" : "timelineButton"}
          onClick={goHome}>Home</button>
        <p className="timelineSeparator">⟶</p>
        <button id="timelineButtonName"
          className={formPosition === 1 ? "timelineButton current" : "timelineButton"}
          onClick={goToName}>Choose a name</button>
        <p className="timelineSeparator">⟶</p>
        <button id="timelineButtonRoom"
          className={formPosition === 2 ? "timelineButton current" : "timelineButton"}
          onClick={goToRoom}>Room Selection</button>
      </div>

      {formPosition === 0 &&
        <ConnectButton socketConnected={socketConnected} incrementPosition={incrementPosition} />}
      {formPosition === 1 && <input type="text" id="username" placeholder="Enter your name" autocomplete="off" />}

    </div>
  );
};

export default IntroductionPage;
