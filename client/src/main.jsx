import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'

// Get the root DOM node
const rootElement = document.getElementById('root');

// Create a root using the new API
const root = createRoot(rootElement);

// Render your app using the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
