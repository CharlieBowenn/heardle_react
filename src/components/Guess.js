import React from 'react'

export default function Guess({number, guess=''}) {
  return (
    <div>
        <label>Guess {number}: {guess}</label>
    </div>
  )
}
