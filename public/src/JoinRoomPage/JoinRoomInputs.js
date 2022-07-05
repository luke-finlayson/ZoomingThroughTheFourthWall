import SocketEvents from '../RoomPage/socketevents';

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

    // Handlers
    const handleRoomIdValueChange = (event) => {
        // Update global value
        setRoomIdValue(event.target.value);

        // Check room name
        socket.emit(SocketEvents.CheckRoomId, roomIdValue, (response) => {
          // If the room doesn't exist, notify user that it'll be created
          if (response === 'Does Not Exist') {
            // User is host
            console.log("host");
          }
          if (response === 'Exists') {
            // User won't be host
            console.log("not host");
          }
        });
    }

    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    }

    return (
    <div className="join_room_inputs_container">
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
