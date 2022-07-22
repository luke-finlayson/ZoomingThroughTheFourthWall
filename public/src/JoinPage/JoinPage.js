import './JoinPage.css'
import Button from "./Button";
import TextField from "./TextField";
import { useInterval } from "../RoomPage/useInterval.js";
import { useState } from "react";
import { store } from '../store/store';
import { useNavigate } from 'react-router-dom';
import * as uuid from 'uuid';
import SocketEvents from '../RoomPage/socketevents';

const JoinPage = ({ socket }) => {

  const [socketConnected, setSocketConnected] = useState(false);
  const [formPosition, setFormPosition] = useState(0);
  const [username, setUsername] = useState('anonymous');
  const [roomName, setRoomName] = useState('default');
  const [isRoomHost, setIsRoomHost] = useState(false);

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

  // Change Handlers
  const roomNameChange = (event) => {
      // Update global value
      setRoomName(event.target.value);

      // Check room name
      socket.emit(SocketEvents.CheckRoomId, event.target.value, (response) => {
        // If the room doesn't exist, notify user that it'll be created
        if (response === 'Does Not Exist') {
          // User is host
          setIsRoomHost(true);
        }
        if (response === 'Exists' || response === 'Null') {
          // User won't be host
          setIsRoomHost(false);
        }

        store.dispatch({ type: 'SET_ROOM_HOST', payload: isRoomHost });
      });
  }

  const usernameChange = (event) => {
      setUsername(event.target.value);
  }

  // Ensures information provided is correct, and navigates to the room page
  const handleJoinToRoom = () => {
      // Set Username
      store.dispatch({ type: 'SET_USER_NAME', payload: username });
      // Set new user id
      store.dispatch({ type: 'SET_USER_ID', payload:  uuid.v4() });

      // Set the room name
      store.dispatch({ type: 'SET_ROOM_ID', payload: roomName });
      // Navigate to room page
      navigate('/room');
  }

  return (
    <div className='introduction_page_container'>
      <h1 className="logo_text">Fourth Wall</h1>

      {formPosition === 0 &&
        <Button socketConnected={socketConnected} incrementPosition={incrementPosition} />}

      {formPosition === 1 &&
        <TextField id="username" placeholder="Enter your name"
          onEnter={incrementPosition} onChange={usernameChange} />}

      {formPosition === 2 &&
        <TextField id="roomName" placeholder="Enter the room name"
          onEnter={handleJoinToRoom} onChange={roomNameChange} />}

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
          onClick={goToRoom}>Room selection</button>
      </div>

    </div>
  );
};

export default JoinPage;
