import React, { useContext } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import styled from 'styled-components'

const LoginStyle = styled.div`
  border: 2px solid #000;
  padding: 50px;
`

export const Button = styled.button`
  margin-left: ${props => props.marginLeft ? props.marginLeft : '0'};
  padding: 5px;
  outline: none;
  cursor: pointer;
  background: #jjk;

`

function Login(users) {
  const {auth} = useContext(Context)
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <LoginStyle>
        <Button onClick={() => signInWithGoogle() }>
            Войти с помощью GOOGLE
        </Button>
    </LoginStyle>
  )
}

export default Login
