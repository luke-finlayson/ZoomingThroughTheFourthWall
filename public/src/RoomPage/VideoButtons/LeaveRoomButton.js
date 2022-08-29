import SocketEvents from '../socketevents';

const LeaveRoomButton = ({ socket, peer, stream }) => {

  // Disconnects the user from the server and stops their stream
  const disconnect = () => {
    // End the stream if the user stream exists
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    socket.emit(SocketEvents.LeaveRoom);
    // Disconnect from the socket
    socket.disconnect();
    // Disconnect from the peer connection
    peer.disconnect();
  }

  const handleRoomDisconnection = () => {
    disconnect();

    // Send the user back to the landing page
    window.location.replace(window.location.protocol + "//" + window.location.host);
  }

  return (
    <button className='video_button_end'
    onClick={handleRoomDisconnection}>
      Leave
    </button>
  )
}

export default LeaveRoomButton
