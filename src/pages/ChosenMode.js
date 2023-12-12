import React, { useEffect, useState, useRef } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import GuessList from '../components/GuessList'
import AudioPlayer from '../components/AudioPlayer'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'

export default function ChosenMode() {
    const {state} = useLocation();
    const {songs, mode} = state
    const [chosenSongName, setChosenSongName] = useState('')
    const [round, setNextRound] = useState(1)
    const [roundGuess, setRoundGuess] = useState(Array(6).fill(''))
    const [correctGuess, setCorrectGuess] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setChosenSongName(Object.keys(songs)[Math.floor(Math.random()*Object.keys(songs).length)])
    }, [songs])
    console.log(chosenSongName)

    function newGame() {
        delete songs[chosenSongName]
        if(Object.keys(songs).length>0) {
            setChosenSongName(Object.keys(songs)[Math.floor(Math.random()*Object.keys(songs).length)])
            setNextRound(1)
            setCorrectGuess(false)
            setGameOver(false)
            setRoundGuess(Array(6).fill(''))
        }     
    }
    const navigate = useNavigate()

    const filterOptions = (options, { inputValue }) => {
        return inputValue ? options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase())) : []
        
    }

    

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };


    function handleGuess() {
        setRoundGuess((prevRounds) => {
            const updatedRounds = [...prevRounds]
            updatedRounds[round-1] = inputValue
            return updatedRounds
        })
        if(inputValue===chosenSongName) {
            setCorrectGuess(true)
            setGameOver(true)
        } else {
            updateRound()
        }
    }

    function updateRound() {
        setNextRound((round) => round+1)
    }

    useEffect(() => {
        // console.log('Round has changed')
        setInputValue('');
        // console.log('Round has changed, just run setInputValue')
        if(round>6) {
            setGameOver(true)
        }
        
    }, [round]);

    useEffect(() => {
        if(gameOver){
            setNextRound(7)
        }
    }, [gameOver])

    

    
    
    
    return (
        <div className='AppStyle'>
        <header className='App-header'>
            {Object.keys(songs).length>0
                ? <div>
                    <p>{mode} Mode - Round {round>6 ? 6 : round}</p>
                    <GuessList className='Guess-box' guesses={roundGuess}/>
                    
                    {chosenSongName && <AudioPlayer url={songs[chosenSongName]} round={round}/>}
                    <Autocomplete
                        options={Object.keys(songs)}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={(option) => option}
                        filterOptions={filterOptions}
                        value={inputValue}
                        onInputChange={handleInputChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Guess a song" />
                        )}
                    />
                    {!gameOver 
                        ? <div>
                            <button onClick={() => updateRound()}>{round<6 ? 'Next Round' : 'Give Up'}</button>
                            <button onClick={() => handleGuess()}>Guess</button>
                          </div>
                        : <button onClick={() => newGame()}>Play Again</button>
                    }
                    {gameOver && <h1 style={{color: correctGuess ? 'green' : 'red'}}>{chosenSongName}</h1>}
                    
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
