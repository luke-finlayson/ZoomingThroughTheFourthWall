import scanText from '../../resources/images/scanText.svg'
import IconAndTextButton from './IconAndTextButton'

let scanIcon = 
    <svg class="edit_icon" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.08 335.67">
        <path d="M383.08,191.87h-47.88v-23.83h-23.73v119.72h23.4v47.92h-95.33v-47.6h23.51v-120.02h-23.57v23.58h-47.88V119.84h191.48v72.03Z"/>
        <path d="M143.76,287.98h47.46v47.66H47.9v-47.65h47.41V48.06H47.8v23.47H0V0H239.03V71.56h-47.45v-23.44h-47.81v239.86Z"/>
    </svg>;

// Renders a edit menu for video element specific functions
const EditVideo = ({setSelectedUser, setShowPopup}) => {
    const showPopup = () => {
        setShowPopup(true)
    }

    return(
        <div className='control_buttons'>
            <div className="control_button_container">
                <IconAndTextButton text="Scan for Text" icon={scanIcon} onClick={showPopup} />
            </div>

            <button className='cancel_edit_button' onClick={() => setSelectedUser(null)}>Cancel</button>
        </div>
    )
}

export default EditVideo