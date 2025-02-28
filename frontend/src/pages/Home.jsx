import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to Connectify</h1>
        <p className="text-lg text-gray-700 mb-4">Connect, chat, and collaborate in real-time!</p>
      </div>
    </div>
  );
};

export default Home;
