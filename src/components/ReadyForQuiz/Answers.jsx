import { decodeEntity } from 'html-entities'
import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import shuffle from '../getRandomAnswer'

const Pstyle = styled.p`
    padding: 5px 0 5px 10px;
    border-radius: 5px;
    transition: all 0.15s ease-in-out;
    &.active {
        background-color: #00ff12 !important;
    }

    &.wrong {
        background-color: blue !important;
    }

    &:hover {
        background-color: #c5dbe4;
        cursor: pointer;
        transition: all 0.15s ease-in-out
    }
`


export const Button = styled.button`
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

export default function Answers({incorrect, correctAnswer, nextQuestion}) {
    const [randomAnswers, setRandomAnswers] = useState()

    useEffect(() => {
        const random = shuffle(incorrect)
        setRandomAnswers(random)
    }, [incorrect])

    return (<div>
        {randomAnswers && randomAnswers
            .map(item => {
                return item.replace(/\&.*?\;/g, (a, b) => {
                    return a = decodeEntity(a)
                  })
              })
            .map((item, key) => {
                return <div key={key}>
                    <Pstyle onClick={(e) => nextQuestion(e, correctAnswer, item) }>
                        <input type='radio' value={item} name={'name'}/> {item}
                    </Pstyle><br/>
            </div>
            })}
        <Button onClick={nextQuestion}>Ответить</Button>
    </div>
  )
}
