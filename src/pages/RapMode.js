import React, { useEffect, useState } from 'react'
import GuessList from '../components/GuessList'
import Guess from '../components/Guess'
import axios from 'axios'
import {useLocation} from 'react-router-dom'

export default function RapMode() {
  const {state} = useLocation();
  const {songs} = state;
  const [chosenSongName, setChosenSongName] = ('')
  useEffect(() => {
    setChosenSongName(Object.keys(songs)[Math.floor(Math.random()*Object.keys(songs).length)])
  }, [])
  // let chosenSongName = Object.keys(songs)[Math.floor(Math.random()*Object.keys(songs).length)]
  console.log(chosenSongName)
  const [audio] = useState(new Audio(songs[chosenSongName]))
  // audio.play()
  // setTimeout(() => audio.pause(), 3000)

  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p>Hi there</p>
            <GuessList className='Guess-box'/>
        </header>
    </div>
  )
}
