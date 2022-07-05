import './IntroductionPage.css'
import ConnectButton from "./ConnectButton";
import { useInterval } from "../RoomPage/useInterval.js";
import { useState } from "react";

const IntroductionPage = ({ socket }) => {

  const [socketConnected, setSocketConnected] = useState(false);

  useInterval(() => {
    // Ensure socket is not null
    if (socket) {
      if (socket.connected) {
        // If the socket connection has been made, update state
        setSocketConnected(true);
      }
    }
  }, 100);

  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        {/* Change the logo here!! */}
        <h1>Fourth Wall</h1>
        {socketConnected ? <ConnectButton /> : <div className="loader"></div>)}
      </div>
    </div>
  );
};

export default IntroductionPage;
