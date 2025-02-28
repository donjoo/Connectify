import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Connectify</h1>
        <div className="space-x-4">
          <Link to="/chat" className="hover:underline">Chat</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <button
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
