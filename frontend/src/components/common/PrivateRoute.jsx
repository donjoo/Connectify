// src/components/common/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default PrivateRoute;