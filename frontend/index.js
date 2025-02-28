import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// import { ThemeProvider } from "@material-tailwind/react";

import './index.css';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    document.body.appendChild(script);
  });
};

const AppWrapper = () => {
 

  return (
      <App />

  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);

// reportWebVitals();