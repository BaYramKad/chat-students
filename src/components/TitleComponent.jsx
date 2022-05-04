import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { Context } from '..'
import { LOGIN_ROUTE } from './routes'
import styled from 'styled-components'
import { Button } from './ReadyForQuiz/Answers'
import { collection, doc, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const HeaderStyle = styled.div`
  position: fixed;
  width: 100%;
  padding: 10px; 
  text-align: right;
  background-color: #029ba4f7;
  z-index: 10;
  
`
const ButtonQuize = styled(Button)`
  margin-right: 20px;
`

function TitleComponent() {
  
  const { auth, db } = useContext(Context)
  const [ user ] = useAuthState(auth)
  const [ readyForQuiz, loading, error ] = useCollectionData(query(collection(db, 'readyForQuiz')))

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

  const onReady = () => readyToQuize()
    return (<HeaderStyle>
      {
        user ? 
        <NavLink to={LOGIN_ROUTE}>
          <ButtonQuize onClick={onReady}>{readyForQuiz && readyForQuiz[0].isReady ? 'Завершить викторину' : 'Принять участие в викторине'} </ButtonQuize>
          <Button onClick={() => signOut(auth)} >Выйти</Button>
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
