import React, {useState} from 'react'
import VideoButtons from './VideoButtons';

const VideoSection = () => {

    // Room will be set by Socket (?)
    const [room, setRoom] = useState();

  return (
    <div className="video_section_container">
      <VideoButtons room={room}/>
    </div>
  )
}

export default VideoSection
