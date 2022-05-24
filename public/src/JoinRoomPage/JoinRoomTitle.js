import React from 'react'

const JoinRoomTitle = ({isRoomHost}) => {
    const titleText = isRoomHost ? 'Host a meeting' : 'Join a meeting';

  return (
    <p className='join_room_title'>{titleText}</p>
  )
}

export default JoinRoomTitle
