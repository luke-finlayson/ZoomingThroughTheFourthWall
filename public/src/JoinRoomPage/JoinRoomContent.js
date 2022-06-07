import React, { useState } from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setConnectOnlyWithAudio } from '../store/actions';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';
import RoomNotFoundMessage from './RoomNotFoundMessage';
import JoinRoomButtons from './JoinRoomButtons';
import { store } from '../store/store';
import * as uuid from 'uuid';
import SocketEvents from '../RoomPage/socketevents';

const JoinRoomContent = ({ isRoomHost, socket,
  connectOnlyWithAudio, setConnectOnlyWithAudioAction }) => {

    // Default values when website is first rendered
    const [roomIdValue, setRoomIdValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const navigate = useNavigate();

    // Checks if the room exists or not using setShowRoomNotFoundMessage
    const [showRoomNotFoundMessage, setShowRoomNotFoundMessage] = useState(false);

    const handleJoinToRoom = () => {
        // Set Username
        store.dispatch({ type: 'SET_USER_NAME', payload: nameValue });
        // Set new user id
        store.dispatch({ type: 'SET_USER_ID', payload:  uuid.v4() });

        // If the user is the host, create room ID
        if (isRoomHost) {
          store.dispatch({ type: 'SET_ROOM_ID', payload: uuid.v4() });
          navigate('/room');
        }
        else {
          // Otherwise, check if room id exists
          socket.emit(SocketEvents.CheckRoomId, roomIdValue, (response) => {
            // Only navigate to room if check was successful
            if (response.status === "Success") {
              store.dispatch({ type: 'SET_ROOM_ID', payload: roomIdValue });
              navigate('/room');
            }
            else {
              // Otherwise, display the error
              alert(response.error);
            }
          })
        }
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
