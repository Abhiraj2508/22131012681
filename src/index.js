// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // ✅ NO EXTENSION NEEDED (.js / .jsx dono chalega)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
