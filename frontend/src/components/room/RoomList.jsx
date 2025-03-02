// src/components/room/RoomList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../../../services/rooms';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (err) {
        setError('Failed to fetch rooms');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, []);
  
  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="room-list">
      <h2>Available Rooms</h2>
      
      {rooms.length === 0 ? (
        <p>No rooms available. Create one!</p>
      ) : (
        <ul>
          {rooms.map(room => (
            <li key={room.id}>
              <Link to={`/rooms/${room.id}`}>
                <h3>{room.name}</h3>
                <p>Created by: {room.creator.username}</p>
                <p>Participants: {room.participants.length}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      
      <Link to="/rooms/create" className="create-room-btn">
        Create New Room
      </Link>
    </div>
  );
};

export default RoomList;