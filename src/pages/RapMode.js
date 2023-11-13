import React from 'react'
import GuessList from '../components/GuessList'
import Guess from '../components/Guess'

export default function RapMode() {
  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p>Hi there</p>
            <GuessList className='Guess-box'/>
        </header>
    </div>
  )
}
