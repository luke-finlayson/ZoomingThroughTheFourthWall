// Displays the current frame of a video in a pop up window in the video section
const ImagePopup = (user_id, setShowPopup) => {

  const closePopup = () => {
    // Disable the pop up
    setShowPopup(false);
  }

  return(
    <div className="popup-container" onClick={closePopup}>
      <div className="popup">
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default ImagePopup
