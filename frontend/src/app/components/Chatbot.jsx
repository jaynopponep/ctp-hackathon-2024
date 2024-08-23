'use client'
import { useState } from 'react';
import styles from './chatbot.module.css'; 

const BACKEND_URL = 'http://127.0.0.1:5000';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]); 

  const sendMessage = async () => {
    if (!message.trim()) return;
  
    setChat([...chat, { sender: 'user', message }]);
  
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),  // Ensure 'message' matches what the backend expects
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      setChat([...chat, { sender: 'user', message }, { sender: 'bot', message: data.reply }]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setChat([...chat, { sender: 'user', message }, { sender: 'bot', message: 'Failed to get response' }]);
    }
  
    setMessage('');  // Clear the input field after sending the message
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>QuickCalm</div>
      <div className={styles.chatMessages}>
        {chat.map((entry, index) => (
          <div
            key={index}
            className={`${styles.chatMessage} ${
              entry.sender === 'user' ? styles.userMessage : styles.botMessage
            }`}
          >
            {entry.message}
          </div>
        ))}
      </div>
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type your message..." //llm text input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.chatSendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
