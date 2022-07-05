import React, { useState } from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';
import JoinRoomButtons from './JoinRoomButtons';
import { store } from '../store/store';
import * as uuid from 'uuid';
import SocketEvents from '../RoomPage/socketevents';

const JoinRoomContent = ({ isRoomHost, socket }) => {

    // Default values when website is first rendered
    const [roomIdValue, setRoomIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const navigate = useNavigate();

    const handleJoinToRoom = () => {
        // Set Username
        store.dispatch({ type: 'SET_USER_NAME', payload: nameValue });
        // Set new user id
        store.dispatch({ type: 'SET_USER_ID', payload:  uuid.v4() });

        // Set the room name
        store.dispatch({ type: 'SET_ROOM_ID', payload: roomIdValue });
        // Navigate to room page
        navigate('/room');
    }

    // Handle enter key press
    const handleKeyPress = (e) => {
      // If enter key was press, navigate to room
      if (e.key === "Enter") {
        handleJoinToRoom();
      }
    }

    return (
     <>
         <JoinRoomInputs
            roomId={roomIdValue}
            setRoomIdValue={setRoomIdValue}
            nameValue={nameValue}
            setNameValue={setNameValue}
            isRoomHost={isRoomHost}
            handleEnter={handleKeyPress}
            socket={socket}
         />
         {/* Connect only with audio */}
        <OnlyWithAudioCheckbox />

        <JoinRoomButtons
            isRoomHost={isRoomHost}
            handleJoinToRoom={handleJoinToRoom}
        />
     </>
  );
}

export default JoinRoomContent;
