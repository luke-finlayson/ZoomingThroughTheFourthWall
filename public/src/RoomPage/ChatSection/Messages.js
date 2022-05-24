import React from 'react'

const dummyMessages = [
  {
    identity: "Luke",
    content: "Hello. Everything is okay ?",
  },
  {
    identity: "Isaac",
    content: "Do you need my help ?",
  },
  {
    content: "Everything is okay",
    messageCreatedByMe: true,
    identity: "me",
  },
  {
    content: "No help needed",
    messageCreatedByMe: true,
    identity: "me",
  },
  {
    identity: "Caleb",
    content: "Hello nice to meet you",
  },
  {
    identity: "Caleb",
    content: "No worries",
  },
];

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

const Messages = () => {
  return (
    <div className="messages_container">
        {/* This needs to be changed in order to integrate database for the chat option */}
      {dummyMessages.map((message, index) => {
          const sameAuthor =
          index > 0 && message.identity === dummyMessages[index-1].identity;
          return (
              <Message
              key={index}
              author={message.identity}
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
