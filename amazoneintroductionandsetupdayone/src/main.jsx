import React from 'react';
import { createRoot } from 'react-dom/client';
import { DataProvider } from './assets/Components/DataProvider/DataProvider.jsx';
import { initialState, reducer } from './Utility/reducer.js';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
