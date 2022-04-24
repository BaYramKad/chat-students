import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter as Router } from "react-router-dom";

import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGouqeLXFb8v-iDY6K9JmxBg-P5NeBSjk",
  authDomain: "chat-students-b4b9f.firebaseapp.com",
  projectId: "chat-students-b4b9f",
  storageBucket: "chat-students-b4b9f.appspot.com",
  messagingSenderId: "735809721385",
  appId: "1:735809721385:web:e1eb60577f42a8060df838"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
