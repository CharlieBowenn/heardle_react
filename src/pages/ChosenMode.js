import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import GuessList from '../components/GuessList'
import AudioPlayer from '../components/AudioPlayer'

export default function ChosenMode() {
    const {state} = useLocation();
    const {songs, mode} = state
    const [chosenSongName, setChosenSongName] = useState('')
    const [round, setNextRound] = useState(1)

    useEffect(() => {
        setChosenSongName(Object.keys(songs)[Math.floor(Math.random()*Object.keys(songs).length)])
    }, [])
    console.log(chosenSongName)

    function newGame() {
        delete songs[chosenSongName]
        if(Object.keys(songs).length>0) {
            setChosenSongName(Object.keys(songs)[Math.floor(Math.random()*Object.keys(songs).length)])
            setNextRound(1)
        }        
    }
    const navigate = useNavigate()
    
    return (
        <div className='AppStyle'>
        <header className='App-header'>
            {Object.keys(songs).length>0
                ? <div>
                    <p>{mode} Mode - Round {round>6 ? 6 : round}</p>
                    <GuessList className='Guess-box'/>
                    {chosenSongName && <AudioPlayer url={songs[chosenSongName]} round={round}/>}
                    {round<7 
                        ? <button onClick={() => setNextRound((round) => round+1)}>{round<6 ? 'Next Round' : 'Give Up'}</button> 
                        : <button onClick={() => newGame()}>Play Again</button>
                    }
                    {round>6 && <h1 style={{color: 'red'}}>{chosenSongName}</h1>}
                </div>

                : <div>
                    <p>Playlist Completed!</p>
                    <button onClick={() => navigate('/categories')}>Return to Categories</button>
                </div>
            }
            
        </header>
    </div>
    )
}
