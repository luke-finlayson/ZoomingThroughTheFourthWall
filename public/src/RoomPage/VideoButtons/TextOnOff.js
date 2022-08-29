const TextOnOff = ({ on }) => {
    return (
        <p className={on ? "toggle_text on" : "toggle_text off"}>{on ? "on" : "off"}</p>
    );
}

export default TextOnOff