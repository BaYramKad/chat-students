import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Answers, { Button } from './Answers'
import {decodeEntity} from 'html-entities';
import getRandomid from '../hooks/getRandomId';
import { Link } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';

const QuizeStyle = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: #1f759542;
`
const Quize = styled.div`
  padding: 20px;
  background-color: #fff;
  width: 50%;
  border-radius: 8px;
  h2 {
    margin: 10px 0 20px 0;
  }
`
export const Span = styled.span`
  font-size: 14px;
  opacity: .7;
  border-bottom: 1px solid #000;
`

const ResetQuizeButton = styled(Button)`
  margin-top: 20px;
`

const ButtonResults = styled(Button)`
  margin-left: 20px;
  font-size: 13px;
  background-color: transparent;
  border: none;
  a {
    text-decoration: none;
    color: #000;
  }
  &:hover {
    background-color: #cccccc4a;
  }
`

const QuizePage = () => {
  const questions = useSelector(state => state.questions.questions)
  const { auth, db } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  const [next, setNext] = useState(1)
  const [prev, setPrev] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setInCorrect] = useState(0)
  const [results, setInResults] = useState(0)
  const [countQuestions, setCountQuestions] = useState(questions.length)
 
  const newArr = questions
        .map(item => ({
          ...item,
          incorrect_answers: [ ...item.incorrect_answers, item.correct_answer ],
          id: getRandomid()
        }))
        .map(item => {
          return {
            ...item,
            question: item.question.replace(/\&.*?\;/g, (a, b) => {
              return a = decodeEntity(a)
            })
          }
        })
        .slice(prev, next)
        
  let event = {}
  const nextQuestion = (e, correctAnswer, studentAnswer) => {
    if(e.target.nodeName === 'P') {
      let check = e.target.firstChild.checked
      e.target.firstChild.checked = !check
      event.e = e
      event.correct_answer = correctAnswer
      event.studentAnswer = studentAnswer
    } else if(e.target.nodeName === 'BUTTON'){
      if(!event.e || event.e.target.firstChild.checked === false ) {
        alert('Выберите один из ответов')
      } else {
        setNext((prev) => prev + 1)
        setPrev((prev) => prev + 1)
        setCountQuestions((prev) => prev - 1)
        event.e.target.firstChild.checked = false
        if(event.studentAnswer === event.correct_answer) {
          setCorrect((prev) => prev + 1)
          setInResults((prev) => prev + 1)
        } else {
          setInCorrect((prev) => prev + 1)
        }
      }
    }
  }

  const resetQuize = () => {
    setNext(1)
    setPrev(0)
    setCorrect(0)
    setInCorrect(0)
    setInResults(0)
    setCountQuestions(questions.length)
  }

  const sendMessage = async () => {
    const docRef = await addDoc(collection(db, "results"), {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
      results: {
        correct,
        incorrect,
        general: `${results}/${questions.length}`
      }
    });
  }

  if(!newArr.length) {
    sendMessage()
  }

  return (
    <QuizeStyle>
      <Quize>
        <Span>Количество вопросов: {countQuestions}</Span>
          { newArr.length ? 
            newArr.map(({question, correct_answer, incorrect_answers, id}, key) => {
              return <div key={key}>
                <h2>{question}</h2>
                <Answers 
                  id={id}
                  incorrect={incorrect_answers}
                  correctAnswer={correct_answer.replace(/\&.*?\;/g, (a, b) => {
                    return a = decodeEntity(a)
                  })}
                  nextQuestion={nextQuestion}
                />
              </div>
            })
            : 
            <div>
                <h2>Ваш результат</h2>
                <h1>{results}/{questions.length}</h1>
                <Span>Правельных: {correct}</Span> <br/>
                <Span>Не правельных: {incorrect}</Span>
                <div>
                  <ResetQuizeButton onClick={() => resetQuize()} >Начать заново</ResetQuizeButton>
                  <ButtonResults><Link to='/main/results'>Посмотреть результаты всех участников</Link></ButtonResults> 
                </div>
              </div>
            }
      </Quize>
    </QuizeStyle>
  )
}

export default QuizePage
