import Actions from "./actions"

const initState = {
    identity: "",
    isRoomHost: false,
    connectOnlyWithAudio: false,
    isScreenSharing: false
};

// Catches changes in the actions, which will allow us to modify which component to output
// based on the button pressed.
const reducer = (state = initState, action) => {
    switch (action.type){
        case Actions.SET_IDENTITY:
            return {
                ...state,
                identity: action.identity
            }
        case Actions.SET_IS_ROOM_HOST:
            return {
                ...state,
                isRoomHost: action.isRoomHost
            }
        case Actions.SET_CONNTECT_ONLY_WITH_AUDIO:
            return {
                ...state,
                connectOnlyWithAudio: action.onlyWithAudio
            }
        case Actions.SET_SCREEN_SHARING:
          return {
            ...state,
            isScreenSharing: action.payload
          }


        default:
            return state;
    }
}

export default reducer;
