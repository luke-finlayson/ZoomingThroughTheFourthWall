import { useNavigate } from 'react-router-dom';
const SocketEvents = require('../socketevents');

const LeaveRoomButton = ({ socket, peer, stream }) => {

  const navigate = useNavigate();

  const handleRoomDisconnection = () => {
    // End the stream
    stream.getTracks().forEach(track => track.stop());
    console.log(stream);
    socket.emit(SocketEvents.LeaveRoom);
    // Disconnect from the socket
    socket.disconnect();
    // Disconnect from the peer connection
    peer.disconnect();
    // Return to introduction page
    navigate("/");
  }

  return (
    <div className='video_button_container'>
      <button className='video_button_end'
      onClick={handleRoomDisconnection}>
        Leave Room
      </button>
    </div>
  )
}

export default LeaveRoomButton
