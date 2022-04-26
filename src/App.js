import React, { useContext } from 'react'
import './App.css';

import TitleComponent from './components/TitleComponent.jsx'
import AppRouter from './components/routingComponent';
import styled from 'styled-components'
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader';

const AppWrapper = styled.div`

`

function App() { 
  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if(loading) {
    return <Loader />
  }

  return (
    <AppWrapper className="App">
      <TitleComponent />
      <AppRouter />
    </AppWrapper>
  );
}

export default App;
