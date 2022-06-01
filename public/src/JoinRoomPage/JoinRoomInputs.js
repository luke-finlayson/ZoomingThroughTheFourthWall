import React from 'react'

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
      roomIdValue, setRoomIdValue, isRoomHost, handleEnter } = props;

    // Handlers
    const handleRoomIdValueChange = (event) => {
        setRoomIdValue(event.target.value);
    }

    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    }

    return (
    <div className="join_room_inputs_container">
        {!isRoomHost && (
            <Input
            placeholder="Enter meeting ID"
            value={roomIdValue}
            changeHandler={handleRoomIdValueChange}
            handleKeyPress={handleEnter}
            />
        )}
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
