import SocketEvents from '../RoomPage/socketevents';
import { store } from '../store/store';
import { useState } from 'react';

const Input = ({ placeholder, value, changeHandler, handleKeyPress }) => {
    return (
        <input
        value = {value}
        onChange = {changeHandler}
        className='join_room_input'
        placeholder = {placeholder}
        onKeyPress = {handleKeyPress}
        />
    )
}

const JoinRoomInputs = (props) => {

    const { nameValue, setNameValue,
      roomIdValue, setRoomIdValue, handleEnter, socket } = props;

    const [isRoomHost, setIsRoomHost] = useState(false);

    // Handlers
    const handleRoomIdValueChange = (event) => {
        // Update global value
        setRoomIdValue(event.target.value);

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
          console.log(store.getState().isRoomHost);
        });
    }

    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    }

    return (
    <div className="join_room_inputs_container">
        {isRoomHost &&
          <p className="join-message">
            Looks like that room doesn't exist, we'll create it for you
          </p>}
        <Input
        placeholder="Enter meeting ID"
        value={roomIdValue}
        changeHandler={handleRoomIdValueChange}
        handleKeyPress={handleEnter}
        />
        <Input
        placeholder="Enter your name"
        value={nameValue}
        changeHandler={handleNameValueChange}
        handleKeyPress={handleEnter}
        />

    </div>
  )
}

export default JoinRoomInputs
