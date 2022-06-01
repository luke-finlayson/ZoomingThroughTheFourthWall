import { useNavigate } from 'react-router-dom';

const LeaveRoomButton = ({ socket, peer }) => {

  const navigate = useNavigate();

  const handleRoomDisconnection = () => {
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
