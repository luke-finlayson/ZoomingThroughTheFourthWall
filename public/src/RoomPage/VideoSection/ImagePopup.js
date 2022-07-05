import { useState } from 'react';
import { useInterval } from '../useInterval';
import SocketEvents from '../socketevents';

// Displays the current frame of a video in a pop up window in the video section
const ImagePopup = ({ socket, user_id, setShowPopup }) => {

  const [gotImage, setGotImage] = useState(false);
  const [imageText, setImageText] = useState("Getting text...");

  // Disables the popup
  const closePopup = () => {
    // Disable the pop up
    setShowPopup(false);
  }

  useInterval(() => {
    if (!gotImage) {
      // Get the video element to get the image from
      const video = document.getElementById(user_id);
      // Get the canvas element to display the image on
      const canvas = document.getElementById('snapshot');

      // Match size of canvas with size of video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Put the current frame of the video on the canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the base64 image from the canvas
      var header = 'data:image/png;base64,';
      var image64 = canvas.toDataURL().slice(header.length);

      // Send the image to the server
      socket.emit(SocketEvents.FindImageText, image64, (result) => {
        // Append returned text to html element
        setImageText(result.response.replace('\n', '<br>'));
      });

      // Image has now been retrieved
      setGotImage(true);
    }
  }, 100);

  return(
    <div className="popup-container" onClick={closePopup}>
      <div className="popup">
        <canvas id="snapshot" hidden />
        <div className="textfield">
          <p id="imageText">{imageText}</p>
        </div>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default ImagePopup
