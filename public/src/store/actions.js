const Actions = { // Constant values for redux functions

    SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
    SET_USER_ID: 'SET_USER_ID',
    SET_USER_NAME: 'SET_USER_NAME',
    SET_CONNTECT_ONLY_WITH_AUDIO: 'SET_CONNTECT_ONLY_WITH_AUDIO',
    SET_SCREEN_SHARING: 'SET_SCREEN_SHARING'

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

export const setIsRoomHost = (isRoomHost) => {
    return {
        type: Actions.SET_IS_ROOM_HOST,
        isRoomHost
    }
}

export const setConnectOnlyWithAudio = (onlyWithAudio) =>{
    return {
        type: Actions.SET_CONNTECT_ONLY_WITH_AUDIO,
        onlyWithAudio,
    }
}

export const setScreenSharing = (isScreenSharing) => {
    return {
        type: Actions.SET_SCREEN_SHARING,
        isScreenSharing
    }
}

export default Actions;
