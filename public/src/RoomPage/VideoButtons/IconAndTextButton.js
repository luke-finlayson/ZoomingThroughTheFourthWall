// Return a button that contains an icon and some text
const IconAndTextButton = ({ onClick, text, icon }) => {
    return (
        <div onClick={onClick} className="icon_text_button">
            {icon}
            <p>{text}</p>
        </div>
    )
}

export default IconAndTextButton