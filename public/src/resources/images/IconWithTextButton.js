import TextOnOff from "../../RoomPage/VideoButtons/TextOnOff"

const IconWithTextButton = ({ svgPaths, enabled, onClick, viewBox }) =>  {
    return (
        <div onClick={onClick} className="video_button_container">
            <svg class={enabled ? "toggle_on video_button_image" : "toggle_off video_button_image"} viewBox={viewBox}>
                {svgPaths.map((path) => {
                    return (
                        <path d={path} />
                    )
                })}
            </svg>
            <TextOnOff on={enabled} />
        </div>
    )
}

export default IconWithTextButton