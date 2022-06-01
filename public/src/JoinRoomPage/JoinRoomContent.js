import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setConnectOnlyWithAudio } from '../store/actions';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';
import RoomNotFoundMessage from './RoomNotFoundMessage';
import JoinRoomButtons from './JoinRoomButtons';
import { store } from '../store/store';

const JoinRoomContent = (props) => {
    const { isRoomHost, setConnectOnlyWithAudioAction, connectOnlyWithAudio } = props;

    // Default values when website is first rendered
    const [roomIdValue, setRoomIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const navigate = useNavigate();

    // Checks if the room exists or not using setShowRoomNotFoundMessage
    const [showRoomNotFoundMessage, setShowRoomNotFoundMessage] = useState(false);

    const handleJoinToRoom = () => {
        // Set Username
        store.dispatch({ type: 'SET_USER_NAME', payload: nameValue })

        // Navigate to the room
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
         />
         {/* Connect only with audio */}
        <OnlyWithAudioCheckbox
            setConnectOnlyWithAudio = {setConnectOnlyWithAudioAction}
            connectOnlyWithAudio = {connectOnlyWithAudio}
        />
        <RoomNotFoundMessage
            showRoomNotFoundMessage={showRoomNotFoundMessage}
        />

        <JoinRoomButtons
            isRoomHost={isRoomHost}
            handleJoinToRoom={handleJoinToRoom}
        />
     </>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudioAction: (onlyWithAudio) =>
        dispatch(setConnectOnlyWithAudio(onlyWithAudio))
    };
}

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoomContent);
