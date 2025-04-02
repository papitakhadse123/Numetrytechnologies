import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);