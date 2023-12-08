import React, { useEffect, useState, useRef } from 'react'
import GuessList from '../components/GuessList'
import Guess from '../components/Guess'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'
import ProgressBar from '../components/ProgressBar'

export default function RapMode() {
  const {state} = useLocation();
  const {songs, tester} = state;
  const [chosenSongName, setChosenSongName] = useState('')
  const [round, setNextRound] = useState(1)
  

  useEffect(() => {
    setChosenSongName(Object.keys(songs)[Math.floor(Math.random()*Object.keys(songs).length)])
  }, [])
  console.log(chosenSongName)
  // const [audio] = useState(new Audio(songs[chosenSongName]))
  // const [playing, setPlaying] = useState(false);
  // const toggle = () => setPlaying(!playing)
  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  // }, [playing])

  function nextRound() {
    setNextRound(round+1)
  }


  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p>Hi there</p>
            <GuessList className='Guess-box'/>
            {chosenSongName && <AudioPlayer url={songs[chosenSongName]} round={round}/>}
            <button onClick={() => nextRound()}>Next Round</button>
        </header>
    </div>
  )
}
