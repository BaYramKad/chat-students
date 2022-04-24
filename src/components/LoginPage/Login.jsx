import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";

function Login(users) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const auth = getAuth();
    const history = useHistory()

    const hendleSingUp = (email, password) => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
            history.push('/main')
        } catch (error) {
            alert('Не удалось зарегестрироваться: ' + error)
        }
    }
  return (
    <div>
        <h2>Авторизация</h2>
        <div>
            <input onChange={ (e) => setEmail(e.target.value) } type="email" />
            <input onChange={ (e) => setPassword(e.target.value) } type="password" />
        </div>
        <button onClick={() => hendleSingUp(email, password) }>
            Sign Up
        </button>
    </div>
  )
}

export default Login
