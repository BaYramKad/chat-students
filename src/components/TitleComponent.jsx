import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { Context } from '..'
import { LOGIN_ROUTE } from './routes'
import styled from 'styled-components'
import { Button } from './LoginPage/Login'
import { collection, doc, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const HeaderStyle = styled.div`
  padding: 10px; 
  text-align: right;
  background-color: green;
`

function TitleComponent() {
  const {auth, db} = useContext(Context)
  const [user] = useAuthState(auth)
  const [readyForQuiz, loading, error] = useCollectionData(query(collection(db, 'readyForQuiz')))


  const readyToQuize = async () => {
    await setDoc(doc(db, "readyForQuiz", 'AS'), {
      displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        isReady: readyForQuiz && !readyForQuiz[0].isReady,
        email: user.email,
        createdAt: serverTimestamp()
    });
   
  }

  const onReady = () => {
    readyToQuize()
  }

  return (<HeaderStyle>
    {
      user ? 
      <NavLink to={LOGIN_ROUTE}>
        <Button onClick={() => signOut(auth)} >Выйти</Button>
        <Button onClick={onReady} marginLeft={'20px'}> {readyForQuiz && readyForQuiz[0].isReady ? 'Вы записаны' : 'Принять участие в викторине'} </Button>

      </NavLink>
      : 
      <>
      <Button>Логин</Button>
      </>
    }
  </HeaderStyle>
  )
}

export default TitleComponent
