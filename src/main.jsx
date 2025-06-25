import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Import Swiper's core CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import your index.css which now includes custom Swiper styles
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

console.log('🚀 React app is initializing...');

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
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