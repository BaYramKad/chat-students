import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter as Router } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components'

import "firebase/auth";
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import store  from './redux';
import { Provider } from 'react-redux';
import { createContext } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

const app = initializeApp({
  apiKey: "AIzaSyCGouqeLXFb8v-iDY6K9JmxBg-P5NeBSjk",
  authDomain: "chat-students-b4b9f.firebaseapp.com",
  projectId: "chat-students-b4b9f",
  storageBucket: "chat-students-b4b9f.appspot.com",
  messagingSenderId: "735809721385",
  appId: "1:735809721385:web:e1eb60577f42a8060df838"
});

const auth = getAuth()
const db = getFirestore(app)
export const Context = createContext()

root.render(
  <Router>
    <Provider store={store}>
        <Global />
        <Context.Provider value={{
          auth,
          db
        }}>
          <App />
        </Context.Provider>
    </Provider>
  </Router>
);

