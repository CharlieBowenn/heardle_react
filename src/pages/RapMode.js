import React from 'react'
import GuessList from '../components/GuessList'
import Guess from '../components/Guess'
import axios from 'axios'
import {useLocation} from 'react-router-dom'

export default function RapMode() {
  const {state} = useLocation();
  const {songs} = state;
  console.log(songs)
  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p>Hi there</p>
            <GuessList className='Guess-box'/>
        </header>
    </div>
  )
}
