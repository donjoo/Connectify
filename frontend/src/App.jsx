import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Register from './components/register';
import Login from './pages/Login';



function App() {
  return (

    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={< Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/signup" element={< Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    
    
    </BrowserRouter>
  )
}

export default App 