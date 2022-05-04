import { collection, orderBy, query } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Context } from '../..'
import styled from 'styled-components'

import { Span } from '../ReadyForQuiz/QuizePage'
const ResutsPageStyle = styled.div`
  height: calc(100% - 55px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Results = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    margin-top: 70px;
`

const ResultsStudent = styled.div`
  border: 3px solid ${({border}) => border ? '#75e300' : '#e32400' };
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  div:first-child {
    img{
      border-radius: 50%;
    }
  }
`


export default function ResultsPage() {
  const { db } = useContext(Context)
  const [ results ] = useCollectionData(query(collection(db, 'results'), orderBy('createdAt')))

  return (
    <ResutsPageStyle>
      <Results>
        {
          results && results.map((item, key) => {
            return <ResultsStudent key={key} border={item.results.correct >= 5 ? true : false}>
              <div>
                <img src={item.photoURL} alt='photo student' />
                <span>{item.displayName}</span>
              </div>
              <div>
                <span>{item.results.general}</span>
                <Span>Правельных {item.results.correct}</Span>
                <Span>Не правельных {item.results.incorrect}</Span>
              </div>
            </ResultsStudent>
          })
        }
      </Results>
    </ResutsPageStyle>
  )
}
