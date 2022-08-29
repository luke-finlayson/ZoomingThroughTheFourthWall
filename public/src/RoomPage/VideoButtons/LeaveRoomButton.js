import SocketEvents from '../socketevents';

const LeaveRoomButton = ({ socket, peer, streams }) => {

  const handleRoomDisconnection = () => {
    // End the stream if the user stream exists
    if (streams && streams[0]) {
      streams[0].stream.getTracks().forEach(track => track.stop());
    }

    socket.emit(SocketEvents.LeaveRoom);
    // Disconnect from the socket
    socket.disconnect();
    // Disconnect from the peer connection
    peer.disconnect();

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
