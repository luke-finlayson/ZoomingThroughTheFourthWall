import { useState } from 'react'
import { spline } from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';

const ConnectButton = ({ socketConnected, incrementPosition}) => {

  const [showBackground, setShowBackground] = useState(true);

  const toggleBackground = () => {
    setShowBackground(!showBackground)

    if (showBackground) {
      //document.getElementById('blobAnimation').setAttribute('dur', '2s');
    }
    else {
      //document.getElementById('blobAnimation').setAttribute('dur', '8s');
    }
  }

  return (
    <div>
    <svg className="blobSvg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="blob_gradient" gradientTransform="rotate(90)">
          <stop id="gradStop1" offset="0%" stopColor="#6fedb7" />
        </linearGradient>
        <path d="" fill="url('#blob_gradient')"></path>
      </defs>
    </svg>
    {socketConnected ? <button className='join_room_button'
      onClick={incrementPosition}
      onMouseOver={toggleBackground}
      onMouseOut={toggleBackground}
      >Join a Room</button> : <div className="loader"></div>}
    </div>
  )
}

export default ConnectButton;
