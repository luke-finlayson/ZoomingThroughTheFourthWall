import { useState } from 'react';
import { useInterval } from '../../Utilities/useInterval';
import SocketEvents from '../../Utilities/socketevents';

// Displays the current frame of a video in a pop up window in the video section
const ImagePopup = ({ socket, user_id, setShowPopup, setSelectedUser }) => {

  const [gotImage, setGotImage] = useState(false);
  const [imageText, setImageText] = useState("Getting text...");

  // Disables the popup
  const closePopup = () => {
    setSelectedUser(null)
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
        console.log(result);

        if (result && result.status === "Success") {
          var text;

          if (result.response instanceof Array) {
            // Join all text elements into one string
            text = result.response.map(textAndBounds => textAndBounds.text).join('');
            result.response.slice(0, 5).forEach(textAndBounds => console.log(`${textAndBounds.text}`));
          }
          else
            text = "No text found."
        }

        else
          text = "Failed to extract text from image."
        
        setImageText(text);
      });

      // Image has now been retrieved
      setGotImage(true);
    }
  }, 100);

  return(
    <div className="popup-container">
      <div className="popup" onClick={() => {return}}>
          <div>
            <canvas id="snapshot" />
            <div></div>
          </div>

        <div className="textfield">
          <p id="imageText">{imageText}</p>
        </div>
        
        <button onClick={closePopup}>Close</button>
      </div>

      <div className='popup_background' onClick={closePopup}></div>
    </div>
  );
}

export default ImagePopup
