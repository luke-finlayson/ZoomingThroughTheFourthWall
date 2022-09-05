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

            result.response.forEach(textAndBounds => {
              let boundingBox = textAndBounds.boundingBox;
              let left = boundingBox[0].x * canvas.width;
              let top = boundingBox[0].y * canvas.height;
              let width = (boundingBox[1].x - boundingBox[0].x) * canvas.width;
              let height = (boundingBox[1].y - boundingBox[0].y) * canvas.height;

              context.beginPath();
              context.lineWidth = "3";
              context.strokeStyle = "red";
              context.rect(left, top, width, height);
              context.stroke();
            })
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
        <div className="snapshot-container">
          <canvas className="snapshot-canvas" id="snapshot" />
        </div>

        <div className="popup-text-field">
          <p id="imageText">{imageText}</p>
        </div>
        
        <button className='leave_button' onClick={closePopup}>Close</button>
      </div>

      <div className='popup_background' onClick={closePopup}></div>
    </div>
  );
}

export default ImagePopup
