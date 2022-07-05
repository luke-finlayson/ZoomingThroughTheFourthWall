import { useState } from 'react';
import CheckImg from '../resources/images/check.png';
import { store } from '../store/store';

const OnlyWithAudioCheckbox = () => {

  const [connectOnlyWithAudio, setConnectOnlyWithAudio] = useState(false);

    const handleConnectionTypeChange = () => {
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
        store.dispatch({ type: 'SET_ONLY_AUDIO', payload: connectOnlyWithAudio });
        console.log(store.getState().connectOnlyWithAudio);
    }

    return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        { !connectOnlyWithAudio && (
            <img className="checkbox_image" src= {CheckImg} />
        )}
      </div>
      <p className="checkbox_container_paragraph">Connect only with audio</p>
    </div>
  )
}

export default OnlyWithAudioCheckbox
