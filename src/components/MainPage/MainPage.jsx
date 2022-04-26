import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../LoginPage/Login'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { serverTimestamp } from "firebase/firestore"
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../Loader';
import { query, orderBy } from "firebase/firestore";

const Input = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #ccc;
    width: 100%;
    input {
      width: 60%;
      border: none;
      outline: none;
      border: 1px solid #ccc;
      padding: 5px;
    }
    button {
      margin-left: 10px;
    }
`

const Messages = styled.div`
  border: 2px solid #000;
  width: 90%;
  height: 100%;
  padding: 10px;
  margin-top: 20px;
  overflow: auto;
  div {
    display: flex;
    width: fit-content;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    img {
      border-radius: 50%;
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
  margin-left: ${({isEmail}) => isEmail ? '0' : 'auto'};
  border: 3px solid ${({isEmail}) => isEmail ? 'blue' : 'red'};
`

const MainPageMessage = styled.div`
  position: absolute;
  height: calc(100% - 55px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function MainPage() {
  const [message, setMessage] = useState('')
  const {auth, db } = useContext(Context)
  const [user] = useAuthState(auth)
  const [ messages, loading, error, snapshot ] = useCollectionData(query(
      collection(db, 'messages'),  
      orderBy('createdAt')
    ))

console.log(messages);
  const sendMessage = async () => {
    const docRef = await addDoc(collection(db, "messages"), {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      message: message,
      email: user.email,
      createdAt: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
  }

  if(loading) {
    return <Loader />
  }

  return (<>
  <MainPageMessage> 
    <Messages>
        {
          messages.map((item, i) => {
            return <Message isEmail={ item.email === user.email ? false : true }>
              <img src={item.photoURL} alt="photo" />
              <div>
                <p key={i}> {item.message} </p>
                <b>{item.displayName}</b>
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
  </>)
}

export default MainPage
