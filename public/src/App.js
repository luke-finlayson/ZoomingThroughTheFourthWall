import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RoomPage from "./RoomPage/RoomPage";
import JoinPage from "./JoinPage/JoinPage";
import io from 'socket.io-client';


// Attempt to create socket connection
const _socket = io("//:443/");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinPage socket={_socket} />}>
        </Route>
        <Route path='/room' element={<RoomPage socket={_socket} />}>
        </Route>
      </Routes>
    </Router>

  );
};

export default App;
