// src/components/video/VideoChat.js
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import { AuthContext } from '../../context/AuthContext';

const VideoChat = () => {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const socketRef = useRef();
  const userVideoRef = useRef();
  const peersRef = useRef([]);
  
  useEffect(() => {
    // Initialize WebSocket connection
    const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
    socketRef.current = new WebSocket(
      `${wsScheme}://${window.location.host}/ws/video/${roomId}/?token=${localStorage.getItem('accessToken')}`
    );
    
    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
        
        socketRef.current.onopen = () => {
          // Tell server about joining
          socketRef.current.send(JSON.stringify({
            type: 'join',
            userId: user.id,
            username: user.username,
          }));
        };
        
        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'all_users':
              // Create peers for all users in the room
              const peers = [];
              data.users.forEach(userId => {
                const peer = createPeer(userId, user.id, stream);
                peersRef.current.push({
                  peerId: userId,
                  peer,
                });
                peers.push({
                  peerId: userId,
                  peer,
                });
              });
              setPeers(peers);
              break;
            
            case 'user_joined':
              // Add new user who joined
              const peer = addPeer(data.signal, data.userId, stream);
              peersRef.current.push({
                peerId: data.userId,
                peer,
              });
              setPeers(peers => [...peers, { peerId: data.userId, peer }]);
              break;
            
            case 'receiving_signal':
              // Handle incoming signal
              const item = peersRef.current.find(p => p.peerId === data.userId);
              item.peer.signal(data.signal);
              break;
            
            case 'user_left':
              // Remove user who left
              const remainingPeers = peersRef.current.filter(p => p.peerId !== data.userId);
              peersRef.current = remainingPeers;
              setPeers(peers => peers.filter(p => p.peerId !== data.userId));
              break;
              
            default:
              break;
          }
        };
      })
      .catch(err => {
        setError('Failed to access camera and microphone');
        console.error(err);
      });
    
    return () => {
      // Clean up
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomId, user]);
  
  // Create peer connection to user already in the room
  const createPeer = (userToSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    
    peer.on('signal', signal => {
      socketRef.current.send(JSON.stringify({
        type: 'sending_signal',
        userToSignal,
        callerId,
        signal,
      }));
    });
    
    return peer;
  };
  
  // Accept peer connection from new user
  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    
    peer.on('signal', signal => {
      socketRef.current.send(JSON.stringify({
        type: 'returning_signal',
        signal,
        callerId,
      }));
    });
    
    peer.signal(incomingSignal);
    
    return peer;
  };
  
  const VideoList = () => {
    return peers.map((peer, index) => {
      return (
        <Video key={index} peer={peer.peer} />
      );
    });
  };
  
  const Video = ({ peer }) => {
    const ref = useRef();
    
    useEffect(() => {
      peer.on('stream', stream => {
        ref.current.srcObject = stream;
      });
    }, [peer]);
    
    return (
      <video playsInline autoPlay ref={ref} className="peer-video" />
    );
  };
  
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="video-chat">
      <h2>Video Chat</h2>
      
      <div className="video-grid">
        <div className="video-container own-video">
          <video ref={userVideoRef} autoPlay muted playsInline className="user-video" />
          <div className="user-label">You</div>
        </div>
        
        <VideoList />
      </div>
      
      <div className="video-controls">
        <button className="control-btn">
          <i className="fas fa-microphone-slash"></i>
        </button>
        <button className="control-btn">
          <i className="fas fa-video-slash"></i>
        </button>
        <button className="control-btn leave-btn">
          Leave
        </button>
      </div>
    </div>
  );
};

export default VideoChat;