import IconAndTextButton from './IconAndTextButton'
import VerticalSeparator from './VerticalSeparator';

let scanIcon = 
    <svg class="edit_icon" viewBox="0 0 383.08 335.67">
        <path d="M383.08,191.87h-47.88v-23.83h-23.73v119.72h23.4v47.92h-95.33v-47.6h23.51v-120.02h-23.57v23.58h-47.88V119.84h191.48v72.03Z"/>
        <path d="M143.76,287.98h47.46v47.66H47.9v-47.65h47.41V48.06H47.8v23.47H0V0H239.03V71.56h-47.45v-23.44h-47.81v239.86Z"/>
    </svg>;
let pinIcon = 
    <svg class="edit_icon"viewBox="0 0 253.67 256">
        <path d="M5.28,256c-5.88-2.51-6.9-6.91-2.83-12.04,18.36-23.22,37.88-45.41,59.05-66.13,9.46-9.27,18.74-18.73,28.13-28.07,.63-.63,1.56-.97,2.35-1.45-.04-.39-.08-.78-.12-1.17-.77-.51-1.65-.91-2.29-1.55-13.16-13.11-26.29-26.25-39.43-39.39-4.32-4.32-4.22-7.95,.3-12.07,11.1-10.11,27.78-10.84,39.75-1.74,.6,.45,1.18,.92,1.94,1.51,24.83-21.31,49.65-42.61,74.32-63.79-.81-2.96-1.88-5.7-2.26-8.53-1.02-7.58,1.42-14.12,6.77-19.53C171.87,1.16,173.18,.68,174.3,0c.83,0,1.67,0,2.5,0,1.63,1.09,3.49,1.96,4.86,3.32,22.91,22.81,45.77,45.68,68.63,68.55,4.66,4.66,4.55,8.36-.59,12.49-7.35,5.9-15.47,6.88-24.13,3.28-1.26-.52-1.96-.55-2.93,.58-20.7,24.18-41.44,48.32-62.17,72.47-.21,.25-.38,.53-.65,.93,4.56,5.35,7.28,11.49,7.71,18.54,.57,9.53-2.58,17.68-9.3,24.42-2.96,2.97-6.94,2.73-10.17-.49-10.86-10.83-21.7-21.67-32.53-32.53-2.35-2.35-4.62-4.78-7.08-7.33-.93,.88-1.65,1.53-2.34,2.21-20.92,20.68-41.08,42.14-63.31,61.45-10.25,8.9-20.86,17.39-31.36,26.01-1.07,.88-2.42,1.41-3.65,2.11h-2.5Z"/>
    </svg>

// Renders a edit menu for video element specific functions
const EditVideo = ({ setSelectedUser, setShowPopup, pinVideo, userIsPinned }) => {
    const showPopup = () => {
        setShowPopup(true)
    }

    return(
        <div className='control_buttons'>
            <div className="control_button_container edit_buttons">
                <IconAndTextButton text="Pin" icon={pinIcon} onClick={pinVideo} enabled={userIsPinned} />
                <VerticalSeparator />
                <IconAndTextButton text="Scan for Text" icon={scanIcon} onClick={showPopup} enabled={true} />
            </div>

            <button className='cancel_edit_button' onClick={() => setSelectedUser(null)}>Cancel</button>
        </div>
    )
}

export default EditVideo