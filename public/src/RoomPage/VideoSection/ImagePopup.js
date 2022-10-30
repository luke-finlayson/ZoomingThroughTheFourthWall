import { useReducer, useState } from 'react';
import { useInterval } from '../../Utilities/useInterval';
import SocketEvents from '../../Utilities/socketevents';
import useCanvas from '../../Utilities/useCanvas';
import BoundingBox from './BoundingBox';

// Displays the current frame of a video in a pop up window in the video section
const ImagePopup = ({ socket, user_id, setShowPopup, setSelectedUser }) => {

  const [gotImage, setGotImage] = useState(false);
  const [imageText, setImageText] = useState("Getting text...");
  const [ boundingBoxes, setBoundingBoxes, snapshotRef, canvasRef ] = useCanvas();
  const [hideCounter, setHideCounter] = useState(0);
  const [copiedText, setCopiedText] = useState("");

  // Disables the popup
  const closePopup = () => {
    setSelectedUser(null)
    // Disable the pop up
    setShowPopup(false);
  }

  useInterval(() => {
    if (hideCounter !== 0) {
      setHideCounter(hideCounter - 1);
    }
  }, 500)

  useInterval(() => {
    if (!gotImage) {
      // Get the video element to get the image from
      const video = document.getElementById(user_id);
      // Get the canvas element to display the image on
      // const canvas = document.getElementById('snapshot');
      let canvas = canvasRef.current;
      let snapshot = snapshotRef.current;
      
      // Match size of canvas with size of video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      snapshot.width = video.videoWidth;
      snapshot.height = video.videoHeight;

      // Put the current frame of the video on the canvas
      const context = snapshot.getContext('2d');
      context.drawImage(video, 0, 0, snapshot.width, snapshot.height);
      // Get the base64 image from the canvas
      var header = 'data:image/png;base64,';
      var image64 = snapshot.toDataURL().slice(header.length);

      // Send the image to the server
      socket.emit(SocketEvents.FindImageText, image64, (result) => {
        // Append returned text to html element
        console.log(result);

        if (result && result.status === "Success") {
          // The final text to display
          var text;
          // An array to store the processed bounding boxes
          let boxes = []; 

          if (result.response instanceof Array) {
            // Join all text elements into one string
            text = result.response.map(textAndBounds => textAndBounds.text).join(' --- ');

            result.response.forEach(textAndBounds => {
              let boundingBox = textAndBounds.boundingBox;

              // Calculate positions and sizes for bounding boxes
              let x = boundingBox[0].x * canvas.width;
              let y = boundingBox[0].y * canvas.height;
              let width = (boundingBox[1].x - boundingBox[0].x) * canvas.width;
              let height = (boundingBox[1].y - boundingBox[0].y) * canvas.height;

              // Create a bounding box and add to the list of bounding boxes
              let box = new BoundingBox(x, y, width, height, textAndBounds.text);
              boxes.push(box);
            });

            // Update the hook with the bounding boxes to render
            setBoundingBoxes(boxes);
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

  const handleClick = (event) => {
    // Retrieve the context of the canvas from the reference
    let canvas = canvasRef.current;
    //let context = canvas.getContext('2d');

    // Determine the current canvas bounding box
    const rect = canvas.getBoundingClientRect();
    // Calculate the coordinates of the mouse click relative to the canvas
    const xPos = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const yPos = ((event.clientY - rect.top) / rect.height) * canvas.height;

    // Search bounding boxes backwards to prioritise boxes rendered on top
    for (let i = boundingBoxes.length - 1; i >= 0; i--) {
      const left = boundingBoxes[i].x;
      const right = boundingBoxes[i].width + left;
      const top = boundingBoxes[i].y;
      const bottom = boundingBoxes[i].height + top;

      if (xPos > left && xPos < right && yPos > top && yPos < bottom) {
        console.log("Selected: " + boundingBoxes[i].text);
        
        // Copy room name to client clipboard
        navigator.clipboard.writeText(boundingBoxes[i].text);
        setHideCounter(3);
        setCopiedText(boundingBoxes[i].text.substring(0, 20))
      }
    }
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="snapshot-container" onClick={() => {return}}>
          <canvas className="snapshot-canvas" id="snapshot" ref={canvasRef} onClick={handleClick} />
          <canvas id="snapshot" ref={snapshotRef} hidden />
        </div>
        
        <button className='leave_button' onClick={closePopup}>Close</button>
      </div>

      <div className='popup_background' onClick={closePopup}></div>

      {(hideCounter !== 0) && <p class="popup_copied_message">Copied: {copiedText}</p>}
    </div>
  );
}

export default ImagePopup
