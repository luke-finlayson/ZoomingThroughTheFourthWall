const TextField = ({ id, placeholder, onEnter, onChange }) => {

  // Handle enter key press
  const handleKeyPress = (e) => {
    // If enter key was press, call the given function
    if (e.key === "Enter") {
      onEnter();
    }
  }

  return(
    <input type="text" id={id} placeholder={placeholder}
      autoComplete="off" onKeyPress={handleKeyPress} onChange={onChange} autoFocus/>
  );
}

export default TextField;
