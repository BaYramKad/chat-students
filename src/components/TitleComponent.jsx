import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { Context } from '..'
import { LOGIN_ROUTE } from './routes'
import styled from 'styled-components'
import { Button } from './LoginPage/Login'

const HeaderStyle = styled.div`
  padding: 10px; 
  text-align: right;
  background-color: green;
`

function TitleComponent() {
  const {auth} = useContext(Context)
  const [user] = useAuthState(auth)
  return (<HeaderStyle>
    {
      user ? 
      <NavLink to={LOGIN_ROUTE}>
        <Button onClick={() => signOut(auth)} >Выйти</Button>
      </NavLink>
      : 
      <Button>Логин</Button>
    }
  </HeaderStyle>
  )
}

export default TitleComponent
