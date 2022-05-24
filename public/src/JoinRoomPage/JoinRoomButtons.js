import React from 'react'
import { useNavigate } from 'react-router-dom';


const Button = ({buttonText, cancelButton, onClickHandler}) => {
    const buttonClass = cancelButton ? 'join_roon_cancel_button' : 'join_room_success_button';

    return (
        <button onClick={onClickHandler} className={buttonClass}>
            {buttonText}
        </button>

    )
}

const JoinRoomButtons = ({handleJoinToRoom, isRoomHost}) => {
  
const navigate = useNavigate();

    const successButtonText = isRoomHost ? "Host" : "Join";

    const pushToIntroductionPage = () => {
        navigate('/');
    }
  
  
    return (
        <div className="join_room_buttons_container">
            <Button buttonText={successButtonText}
                onClickHandler={handleJoinToRoom}
            />
            <Button buttonText="Cancel"
                cancelButton
                onClickHandler={pushToIntroductionPage} />
        </div>
    )
}

export default JoinRoomButtons
