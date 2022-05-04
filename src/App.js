import React, { useEffect } from 'react'
import './App.css';

import TitleComponent from './components/TitleComponent.jsx'
import AppRouter from './components/routingComponent';
import Loader from './components/Loader';

import { useDispatch } from 'react-redux';
import { getQuestionsFetch } from './redux/redusers/getQuestions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from '.';


function App() {
  const { auth } = useContext(Context)
  const [ user, loading ] = useAuthState(auth)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuestionsFetch())
  }, [])

  if(loading) {
    return <Loader />
  }

  return (
    <div className="App">
      <TitleComponent />
      <AppRouter />
    </div>
  );
}

export default App;
