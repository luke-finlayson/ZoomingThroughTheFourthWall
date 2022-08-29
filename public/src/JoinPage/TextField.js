const TextField = ({ id, placeholder, onEnter, onChange, value }) => {

  // Handle enter key press
  const handleKeyPress = (e) => {
    // If enter key was press, call the given function
    if (e.key === "Enter") {
      onEnter();
    }
  }

  return(
    <input type="text" id={id} placeholder={placeholder}
      autoComplete="off" onKeyPress={handleKeyPress} onChange={onChange}
      autoFocus value={value} className="join_room_input" />
  );
}

export default TextField;
