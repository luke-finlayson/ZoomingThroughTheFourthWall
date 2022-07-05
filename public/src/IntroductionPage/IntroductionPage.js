import React, { useEffect } from 'react'
import './IntroductionPage.css'
import ConnectingButtons from "./ConnectingButtons";
import { connect } from 'react-redux'
import { setIsRoomHost } from '../store/actions';

const IntroductionPage = ({ setIsRoomHostAction, socket }) => {

  useEffect( () => {setIsRoomHostAction(false);
  }, []);

  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        {/* Change the logo here!! */}
        <h1>Fourth Wall</h1>
        {socket &&
          (socket.connected ? <ConnectingButtons /> : <div className="loader"></div>)
        }
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  }
}

export default connect(null, mapDispatchToProps)(IntroductionPage);
