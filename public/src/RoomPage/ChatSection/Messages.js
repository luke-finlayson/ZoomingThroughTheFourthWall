import { useState } from 'react';
import { store } from '../../store/store';
import SocketEvents from '../socketevents';
import { useInterval } from '../useInterval';

// Returns a div element formatted as a message with the given data
const Message = ({author, content, sameAuthor, messageCreatedByMe}) => {
    const alignClass  = messageCreatedByMe ? 'message_align_right' : 'message_align_left';

    const authorText = messageCreatedByMe ? 'You' : author;

    const contentAdditionalStyles = messageCreatedByMe ? 'message_right_styles' : 'message_left_styles';

    return (
        <div className={`message_container ${alignClass}`}>
            {!sameAuthor && <p className='message_title'>{authorText}</p>}
            <p className={`message_content ${contentAdditionalStyles}`}>{content}</p>
        </div>
    )
}

const Messages = ({ socket, messages }) => {

  return (
    <div className="messages_container">
    {messages.map((message, index) => {
        const sameAuthor =
        index > 0 && message.userId === messages[index-1].userId;
        return (
            <Message
            key={index}
            author={message.author}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreatedByMe={message.messageCreatedByMe}
            />
        )
    })}
    </div>
  )
}

export default Messages
