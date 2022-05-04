import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../ReadyForQuiz/Answers'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import { serverTimestamp } from "firebase/firestore"
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../Loader';
import { query, orderBy } from "firebase/firestore";
import  QuizePage from '../ReadyForQuiz/QuizePage';

const Input = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 60%;
    input {
      min-width 60%;
      border: none;
      outline: none;
      padding: 5px;
      border: 2px solid #ccc;
    }
    button {
      margin-left: 10px;
    }
`
const Messages = styled.div`
  width: 90%;
  height: 100%;
  padding: 10px;
  margin-top: 60px;
  overflow: scroll;
  div {
    display: flex;
    width: fit-content;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    img {
      border-radius: 50%;
      border: 2px solid #fff;
      padding: 2px;
      width: 40px;
      height: 40px;
    }
    p {
      display: inline-block;
    }

    div {
      border: 0;
      padding: 0;
      margin-left: 10px;
      background-color: transparent;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
    }
  }
`
const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({isEmail}) => isEmail ? '0' : 'auto'};
  background-color: #004d61;
  color: #fff;
  div {
    display: flex;
  }
  div:first-child {
    display: flex;
    flex-direction: row;
    b {
      margin-left: 10px;
    }
  }
  div:last-child {
    p {
      word-break: break-all;

    }
  }
`

export const MainPageMessage = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b3ff7538;
`

function MainPage() {
  const [message, setMessage] = useState('')
  const { auth, db } = useContext(Context)

  const [user, loading, error] = useAuthState(auth)
  const [ messages ] = useCollectionData(query(collection(db, 'messages'), orderBy('createdAt')))
  const [ readyForQuiz ] = useCollectionData(query(collection(db, 'readyForQuiz')))

  const ready = readyForQuiz && readyForQuiz[0].isReady


  const sendMessage = async () => {
    const docRef = await addDoc(collection(db, "messages"), {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      message: message,
      email: user.email,
      createdAt: serverTimestamp()
    });
    setMessage('')
  }

  if(loading) {
    return <Loader />
  }

  return (<div>
      {
        ready ? 
            <QuizePage />
          :
          <MainPageMessage> 
              <Messages>
                  {
                    messages && messages.map((item, i) => {
                      return <Message key={i} isEmail={ item.email === user.email ? false : true }>
                        <div>
                          <img src={item.photoURL} alt='photo'/>
                          <b>{item.displayName}</b>
                        </div>
                        <div>
                          <p key={i}> {item.message} </p>
                        </div>
                      </Message>
                    })
                  }
              </Messages>
              <Input>
                <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" />
                <Button onClick={sendMessage}> Отправить </Button>
              </Input>
            </MainPageMessage>
      }
  
  </div>)
}

export default MainPage
