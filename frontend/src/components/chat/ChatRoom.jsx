// src/components/chat/ChatRoom.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import { getRoom } from '../../services/rooms';
import { AuthContext } from '../../context/AuthContext';
import { closeConnection, connectWebSocket, sendMessage } from '../../../services/websocket';
import { getRoom } from '../../../services/rooms';

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoom(roomId);
        setRoom(roomData);
      } catch (err) {
        setError('Failed to load room');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoom();
    
    // Connect to WebSocket
    if (user) {
      const socket = connectWebSocket(roomId, localStorage.getItem('accessToken'));
      
      socket.onopen = () => {
        console.log('WebSocket connected');
      };
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages(prevMessages => [...prevMessages, data]);
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      socket.onclose = () => {
        console.log('WebSocket disconnected');
      };
    }
    
    return () => {
      closeConnection();
    };
  }, [roomId, user]);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      sendMessage(newMessage.trim(), user.username);
      setNewMessage('');
    }
  };
  
  if (loading) return <div>Loading chat room...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!room) return <div>Room not found</div>;
  
  return (
    <div className="chat-room">
      <h2>{room.name}</h2>
      
      <div className="chat-container">
        <div className="messages-container">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.username === user.username ? 'own-message' : ''}`}
              >
                <div className="message-header">
                  <span className="username">{msg.username}</span>
                  <span className="timestamp">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="message-body">{msg.message}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
          />
          <button type="submit" disabled={!newMessage.trim()} className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;