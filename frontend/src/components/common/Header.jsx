// src/components/common/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Chat App</Link>
      </div>
      
      <nav className="navigation">
        {user ? (
          <>
            <Link to="/rooms">Rooms</Link>
            <span className="user-info">
              Welcome, {user.username}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;