import React, { useEffect } from 'react'
import './App.css';

import { Route } from 'react-router-dom';

import TitleComponent from './components/TitleComponent.jsx'
import MainPage from './components/MainPage/MainPage.jsx';
import Login from './components/LoginPage/Login.jsx';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const history = useHistory()
  const auth = getAuth()
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
            user ? history.push('/main') : history.push('/login')
    })
  }, [])

  return (
    <div className="App">
      <TitleComponent />
      <Route path='/login' component={Login} />
      <Route path='/main' component={MainPage} />
    </div>
  );
}

export default App;
