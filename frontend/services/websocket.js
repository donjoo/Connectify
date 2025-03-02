// src/services/websocket.js
let socket = null;

export const connectWebSocket = (roomName, token) => {
  const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const wsUrl = `${wsScheme}://${window.location.host}/ws/chat/${roomName}/?token=${token}`;
  
  socket = new WebSocket(wsUrl);
  
  return socket;
};

export const sendMessage = (message, username) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      message,
      username
    }));
  } else {
    console.error('WebSocket is not connected');
  }
};

export const closeConnection = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};