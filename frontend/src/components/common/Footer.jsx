// src/components/common/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Chat Application</p>
    </footer>
  );
};

export default Footer;