import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import { AuthProvider } from './context/AuthContext';
import RoomList from './components/room/RoomList';
import RoomForm from './components/room/RoomForm';
import ChatRoom from './components/chat/ChatRoom';
import VideoChat from './components/video/VideoChat';
import Header from './components/common/Header';
import PrivateRoute from './components/common/PrivateRoute';
import Footer from './components/common/Footer';
import LoginForm from './pages/Login';
import RegisterForm from './components/register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter> {/* ✅ Corrected */}
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              
              {/* Protected routes */}
              <Route 
                path="/rooms" 
                element={
                  <PrivateRoute>
                    <RoomList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/rooms/create" 
                element={
                  <PrivateRoute>
                    <RoomForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/rooms/:roomId" 
                element={
                  <PrivateRoute>
                    <ChatRoom />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/rooms/:roomId/video" 
                element={
                  <PrivateRoute>
                    <VideoChat />
                  </PrivateRoute>
                } 
              />
              
              {/* Default route */}
              <Route path="/" element={<Navigate to="/rooms" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
