import React from 'react'
import Guess from './Guess'

export default function GuessList() {
  const guesses = []
  for(let i=1; i<7; i++) {
    guesses.push(<Guess number={i} />)
  }
  return (
    <div>
        {guesses}       
    </div>
  )
}
