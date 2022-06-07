import React, {useEffect} from 'react'
import './JoinRoomPage.css'
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import { useLocation } from 'react-router-dom';
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from './JoinRoomContent';

const JoinRoomPage = (props) => {
    const {setIsRoomHostAction, isRoomHost, socket } = props;

    const search = useLocation().search;

    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get("host"); // Checks if we are host in the search bar

        // Checks if we are the room host
        // If we are, set the action to true
        if (isRoomHost){
            // Change information about it in our store.
            setIsRoomHostAction(true);
        }
    }, [])

    return (
        <div className="join_room_page_container">
            <div className='join_room_page_panel'>
                <JoinRoomTitle isRoomHost={isRoomHost}/>
                <JoinRoomContent
                    isRoomHost={isRoomHost}
                    socket={socket}
                />
            </div>
        </div>
  )
}

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    }
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoomPage);
