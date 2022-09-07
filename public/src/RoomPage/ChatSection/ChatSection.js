import { useState, createRef } from 'react';
import ChatLabel from './ChatLabel';
import Messages from './Messages';
import NewMessage from './NewMessage';
import { store } from '../../store/store';
import { useInterval } from '../../Utilities/useInterval';
import SocketEvents from '../../Utilities/socketevents';

// Holds a list of all the messages
const messages = [];

const ChatSection = ({ socket }) => {

  const messageInput = createRef();

  // Store messages as a state so that new messages are rendered as they are added
  const [messagesState, setMessages] = useState(messages.slice());
  // To ensure socket event listener is only created once
  const [socketSetup, setSocketSetup] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  // Poll to create listener
  useInterval(() => {
    // Ensure socket connection has been made
    if (socket !== null && !socketSetup) {

      // Request previous messages from the server
      socket.emit(SocketEvents.GetMessageHistory, store.getState().roomId, (response) => {
        if (response.status === "Success") {

          // Add messages to local array of messages
          response.payload.rows.forEach((message) => {
            var messageCreatedByMe = false;
            // Determine if the message was sent by this user
            if (message.user_id === store.getState().userId) {
              messageCreatedByMe = true;
            }
            // Add the message to the list of messages
            messages.push({
              userId: message.user_id,
              author: message.user_name,
              content: message.message,
              messageCreatedByMe: messageCreatedByMe
            });

            // Update messages state
            setMessages(messages.slice());
          });
        }
      });

      // Create a new message on message received
      socket.on(SocketEvents.NewMessage, (message) => {
        var messageCreatedByMe = false;
        // Determine if the message was sent by this user
        if (message.authorID === store.getState().userId) {
          messageCreatedByMe = true;
        }
        // Add the message to the list of messages
        messages.push({
          userId: message.authorID,
          author: message.authorName,
          content: message.content,
          messageCreatedByMe: messageCreatedByMe
        });
        // Update messages state
        setMessages(messages.slice());
      });

      // Create a socket event to listen for clearing messages
      socket.on(SocketEvents.ClearMessages, () => {
          // Clear the array of messages
          while (messages.length > 0) {
            messages.pop();
          }
          setMessages(messages.slice());
      });

      // Ensure this is never called again
      setSocketSetup(true);
    }
  }, 1000);

  return (
    <div 
    className={collapsed ? "chat_section_container collapsed_section" 
    : "chat_section_container expanded_section"}>
        <ChatLabel socket={socket} collapsed={collapsed} setCollapsed={setCollapsed} messageInput={messageInput}/>
        {!collapsed && 
          <Messages socket={socket} messages={messagesState} />}
        {!collapsed && 
          <NewMessage socket={socket} messageInput={messageInput} />}
    </div>
  )
}

export default ChatSection
