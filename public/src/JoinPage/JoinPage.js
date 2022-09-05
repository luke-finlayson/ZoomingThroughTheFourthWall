import './JoinPage.css'
import Button from "./Button";
import TextField from "./TextField";
import { useInterval } from "../Utilities/useInterval";
import { useState } from "react";
import { store } from '../store/store';
import { useNavigate } from 'react-router-dom';
import * as uuid from 'uuid';
import SocketEvents from '../Utilities/socketevents';

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
    if (socket && socket.connected) {
      // If the socket connection has been made, update state
      setSocketConnected(true);
    }
  }, 100);

  // Set form position to 0
  const goTo = (position) => {
    // Don't go anywhere if there is a form error
    if (!formError) {
      if (formPosition <= 1 && username.trim() !== "") {
        return;
      }
      // Go to the specified section
      setFormPosition(position);
      // Reset form message
      setFormMessage("");
    }
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
          setFormMessage("Looks like that room doesn't exists, we'll create it for you..")
          setFormError(false)
        }
        if (response === 'Exists') {
          // User won't be host
          setIsRoomHost(false);
          setFormMessage("")
          setFormError(false)
        }
        if (response === 'Null') {
          setFormMessage("You must enter a room name to join")
          setFormError(true)
        }

        store.dispatch({ type: 'SET_ROOM_HOST', payload: isRoomHost });
      });
  }

  const usernameChange = (event) => {
      // Update username state
      setUsername(event.target.value);

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

        {formPosition === 2 &&
          <TextField id="username" placeholder="Enter your name" value={username} onChange={usernameChange} 
            onEnter={handleJoinToRoom} />}

        {formPosition === 1 &&
          <TextField id="roomName" placeholder="Enter the room name" value={roomName} onChange={roomNameChange}
          onEnter={() => goTo(2)} />}

        <p className="formMessage">{formMessage}</p>
      </div>

      <div className="progressTimeline">
        <button id="timelineButtonHoom"
          className={formPosition === 0 ? "timelineButton current" : "timelineButton"}
          tabIndex={formPosition === 0 ? "-1" : "0"}
          onClick={() => goTo(0)}>Home</button>
        <p className="timelineSeparator">⟶</p>
        <button id="timelineButtonRoom"
          className={formPosition === 1 ? "timelineButton current" : "timelineButton"}
          tabIndex={formPosition === 1 ? "-1" : "0"}
          onClick={() => goTo(1)}>Room selection</button>
        <p className="timelineSeparator">⟶</p>
        <button id="timelineButtonName"
          className={formPosition === 2 ? "timelineButton current" : "timelineButton"}
          tabIndex={formPosition === 2 ? "-1" : "0"}
          onClick={() => goTo(2)}>Choose a name</button>
      </div>
    </div>
  );
};

export default JoinPage;
