import Actions from "./actions";
import * as uuid from 'uuid';

const initState = {
    userId: uuid.v4(),
    username: null,
    roomId: null,
    isScreenSharing: false,
    isRoomHost: false,
    // Change this to the address of the production server
    serverUrl: 'localhost',
    connectOnlyWithAudio: false
};

// Catches changes in the actions, which will allow us to modify which component to output
// based on the button pressed.
const reducer = (state = initState, action) => {
    switch (action.type){
        case Actions.SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        case Actions.SET_USER_NAME:
            return {
                ...state,
                username: action.payload
            }
        case Actions.SET_ROOM_ID:
            return {
                ...state,
                roomId: action.payload
            }
        case Actions.SET_SCREEN_SHARING:
            return {
                ...state,
                isScreenSharing: action.payload
            }
        case Actions.SET_ROOM_HOST:
            return {
                ...state,
                isRoomHost: action.payload
            }
        case Actions.SET_ONLY_AUDIO:
            return {
                ...state,
                connectOnlyWithAudio: action.payload
            }

        default:
            return state;
    }
}

export default reducer;
