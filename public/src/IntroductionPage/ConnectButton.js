import { useNavigate } from 'react-router-dom';

const ConnectButton = () => {
  // Create navigator
  const navigate = useNavigate();

  // Handle button click
  const navigateToInputs = () => {
    // Navigate to join room inputs
    navigate('/join-room');
  }

  return (
    <button className='join_room_button'
      onClick={navigateToInputs}>Connect</button>
  )
}

export default ConnectButton;
