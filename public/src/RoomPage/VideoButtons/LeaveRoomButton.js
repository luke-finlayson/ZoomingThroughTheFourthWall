import { store } from '../../store/store';
import SocketEvents from '../../Utilities/socketevents';

const LeaveRoomButton = ({ socket, peer, stream }) => {

  // Disconnects the user from the server and stops their stream
  const disconnect = () => {
    // End the stream if the user stream exists
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // Disconnect from the socket
    socket.emit(SocketEvents.LeaveRoom);
    socket.emit(SocketEvents.RemoveStream, "DISP" + store.getState().userId);
    socket.destroy();
    // Disconnect from the peer connection
    peer.destroy();
  }

  const handleRoomDisconnection = () => {
    disconnect();

    // Send the user back to the landing page
    window.location.replace(window.location.protocol + "//" + window.location.host);
  }

  return (
    <button className='leave_button'
    onClick={handleRoomDisconnection}>
      Leave
    </button>
  )
}

export default LeaveRoomButton
