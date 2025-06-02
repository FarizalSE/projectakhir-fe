import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import bulma from 'bulma/css/bulma.min.css';
import { Modal } from "bootstrap";

// Supaya dapat mengirimkan cookie secara otomatis
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);