import React from 'react'
import './App.css';

import { Route } from 'react-router-dom';

import TitleComponent from './components/TitleComponent.jsx'
import MainPage from './components/MainPage/MainPage.jsx';
import Login from './components/LoginPage/Login.jsx';

function App() {
  return (
    <div className="App">
      <TitleComponent />
      <Route path='/login' component={Login} />
      <Route path='/main' component={MainPage} />
    </div>
  );
}

export default App;
