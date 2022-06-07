import { useState } from 'react';
import { store } from '../../store/store';
import { useInterval } from '../VideoSection/useInterval';

// Holds a list of all the messages
const messages = [];

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

const Messages = ({ socket }) => {

  // Store messages as a state so that new messages are rendered as they are added
  const [messagesState, setMessages] = useState(messages.slice());
  // To ensure socket event listener is only created once
  const [socketSetup, setSocketSetup] = useState(false);

  // Poll to create listener
  useInterval(() => {
    // Ensure socket connection has been made
    if (socket !== null && !socketSetup) {
      // Create a new message on message received
      socket.on("new-message", (author, message, id) => {
        var messageCreatedByMe = false;
        // Determine if the message was sent by this user
        if (id === store.getState().userId) {
          messageCreatedByMe = true;
        }
        // Add the message to the list of messages
        messages.push({
          userId: id,
          author: author,
          content: message,
          messageCreatedByMe: messageCreatedByMe
        });
        // Update messages state
        setMessages(messages.slice());
      });

      // Ensure this is never called again
      setSocketSetup(true);
    }
  }, 1000);

  return (
    <div className="messages_container">
    {messagesState.map((message, index) => {
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
