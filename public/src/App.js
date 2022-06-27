import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import './App.css';
import io from 'socket.io-client';
import { store } from './store/store';
import { useInterval } from './RoomPage/useInterval';

function App() {

  const [socket, setSocket] = useState(null);

  // Use polling to establish socket connection
  useInterval(() => {
    // Establish the socket connection if it hasn't already
    if (socket === null || !socket.connected) {
      // Attempt to create socket connection
      const socket = io("https://" + store.getState().serverUrl + ':443/');
      // Store socket connection in state
      setSocket(socket);
    }
  }, 100);

  return (
    <Router>
      <Routes>
        <Route path ='join-room' element={<JoinRoomPage socket={socket} />}>
        </Route>
        <Route path='/room' element={<RoomPage socket={socket} />}>
        </Route>
        <Route path="/" element={<IntroductionPage socket={socket} />}>
        </Route>
      </Routes>
    </Router>

  );
};

export default App;
