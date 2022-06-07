const Actions = { // Constant values for redux functions

    SET_ROOM_ID: 'SET_ROOM_ID',
    SET_USER_ID: 'SET_USER_ID',
    SET_USER_NAME: 'SET_USER_NAME',
    SET_SCREEN_SHARING: 'SET_SCREEN_SHARING',
    SET_ROOM_HOST: 'SET_ROOM_HOST',
    SET_ONLY_AUDIO: 'SET_ONLY_AUDIO'

} // Changes state in our store

// Helper functions.
// If our store can change values, we can render different components
// depending on the VALUES passed
export const setUserId = (userId) => {
    return {
        type: Actions.SET_USER_ID,
        userId
    }
}

export const setUserName = (username) => {
    return {
        type: Actions.SET_USER_NAME,
        username
    }
}

export const setRoomId = (roomId) => {
    return {
        type: Actions.SET_ROOM_ID,
        roomId
    }
}

export const setScreenSharing = (isScreenSharing) => {
    return {
        type: Actions.SET_SCREEN_SHARING,
        isScreenSharing
    }
}

export const setIsRoomHost = (isRoomHost) => {
  return {
    type: Actions.SET_ROOM_HOST,
    isRoomHost
  }
}

export const setConnectOnlyWithAudio = (connectOnlyWithAudio) => {
  return {
    type: Actions.SET_ONLY_AUDIO,
    connectOnlyWithAudio
  }
}

export default Actions;
