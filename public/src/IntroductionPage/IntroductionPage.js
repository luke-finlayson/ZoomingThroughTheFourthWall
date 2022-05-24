import React, { useEffect } from 'react'
import './IntroductionPage.css'
import ConnectingButtons from "./ConnectingButtons";
import { connect } from 'react-redux'
import { setIsRoomHost } from '../store/actions';

const IntroductionPage = ({setIsRoomHostAction}) => {
  
  useEffect( () => {setIsRoomHostAction(false);
  }, []);
  
  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        {/* Change the logo here!! */}
        <h1>Fourth Wall Project</h1>
        <ConnectingButtons />
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
