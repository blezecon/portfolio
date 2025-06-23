import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('🚀 React app is initializing...');

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('✅ React app rendered successfully');
} catch (error) {
  console.error('❌ Error rendering React app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Something went wrong</h1>
      <p>Check the console for details.</p>
      <pre style="background: #f7f7f7; padding: 10px; border-radius: 5px; overflow: auto;">${error.message}</pre>
    </div>
  `;
}