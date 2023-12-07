import React, { useEffect, useState } from 'react'
import GuessList from '../components/GuessList'
import Guess from '../components/Guess'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'

export default function RapMode() {
  const {state} = useLocation();
  const {songs} = state;
  const [chosenSongName, setChosenSongName] = useState('')

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

  function renderAudioPlayer() {

  }
  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p>Hi there</p>
            <GuessList className='Guess-box'/>
            {chosenSongName && <AudioPlayer url={songs[chosenSongName]}/>}
        </header>
    </div>
  )
}
