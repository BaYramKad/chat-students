import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter as Router } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import "firebase/auth";
import { collection, getFirestore, query } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const app = initializeApp({
  apiKey: "AIzaSyCGouqeLXFb8v-iDY6K9JmxBg-P5NeBSjk",
  authDomain: "chat-students-b4b9f.firebaseapp.com",
  projectId: "chat-students-b4b9f",
  storageBucket: "chat-students-b4b9f.appspot.com",
  messagingSenderId: "735809721385",
  appId: "1:735809721385:web:e1eb60577f42a8060df838"
});

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
const auth = getAuth()
const db = getFirestore(app)


const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

root.render(
  <Router>
    <Context.Provider value={{
        auth,
        db
      }}>
        <Global />
        <App />
    </Context.Provider>
  </Router>
);

