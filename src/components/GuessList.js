import React from 'react'
import Guess from './Guess'

export default function GuessList({guesses}) {
  return (
    <div>
      {guesses.map((guess, index) => (
        <Guess number={index+1} guess={guess}/>
      ))}
    </div>
  )
}
