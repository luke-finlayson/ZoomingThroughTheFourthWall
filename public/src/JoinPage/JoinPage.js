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
  const [formMessage, setFormMessage] = useState();

  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isRoomHost, setIsRoomHost] = useState(false);

  const [formError, setFormError] = useState(false);


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

  // Set form position to 0
  const goTo = (position) => {
    // Don't move onto the room name input if the name field is blank
    if (formPosition <= 1 && formError) {
      return;
    }
    // Go to the specified section
    setFormPosition(position);
    // Reset form message
    setFormMessage("");
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
      // Update username state
      setUsername(event.target.value.trim());

      // Determine which message to display
      if (event.target.value.trim() === "") {
        setFormMessage("You must enter a valid username");
        // Disable possible button paths
        setFormError(true);
      }
      else {
        setFormMessage("");
        setFormError(false);
      }
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

      <div className="formContainer">
        {formPosition === 0 &&
          <Button socketConnected={socketConnected} goTo={goTo} />}

        {formPosition === 1 &&
          <TextField id="username" placeholder="Enter your name" value={username}
            onEnter={() => goTo(2)} onChange={usernameChange} />}

        {formPosition === 2 &&
          <TextField id="roomName" placeholder="Enter the room name" value={roomName}
            onEnter={handleJoinToRoom} onChange={roomNameChange} />}

        <p className="formMessage">{formMessage}</p>
      </div>

      <div className="progressTimeline">
        <button id="timelineButtonHoom"
          className={formPosition === 0 ? "timelineButton current" : "timelineButton"}
          tabIndex={formPosition === 0 ? "-1" : "0"}
          onClick={() => goTo(0)}>Home</button>
        <p className="timelineSeparator">⟶</p>
        <button id="timelineButtonName"
          className={formPosition === 1 ? "timelineButton current" : "timelineButton"}
          tabIndex={formPosition === 1 ? "-1" : "0"}
          onClick={() => goTo(1)}>Choose a name</button>
        <p className="timelineSeparator">⟶</p>
        <button id="timelineButtonRoom"
          className={formPosition === 2 ? "timelineButton current" : "timelineButton"}
          tabIndex={formPosition === 2 ? "-1" : "0"}
          onClick={() => goTo(2)}>Room selection</button>
      </div>
    </div>
  );
};

export default JoinPage;
