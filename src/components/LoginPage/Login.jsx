import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import styled from 'styled-components'
import { useContext } from 'react';
import { Context } from '../..';

const LoginStyle = styled.div`
  border: 2px solid #000;
  padding: 50px;
`


const ButtonLogin = styled.button`
    margin: 0 auto;
    padding: 10px 20px;
    border: 0;
    outline: none;
    background-color: #09751e;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    &:hover {
        background-color: #004e0fc2;
        transition: all 0.15s ease-in-out;
    }
`


function Login() {
  const { auth } = useContext(Context)
  const [ signInWithGoogle ] = useSignInWithGoogle(auth);

  return (
    <LoginStyle>
        <ButtonLogin onClick={() => signInWithGoogle() }>
            Войти с помощью GOOGLE
        </ButtonLogin>
    </LoginStyle>
  )
}

export default Login
