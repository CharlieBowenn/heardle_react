import React, { useEffect, useState } from 'react'
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

    const filterOptions = (options, { inputValue }) => {
        return inputValue ? options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase())) : []
        
    }

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    
    
    return (
        <div className='AppStyle'>
        <header className='App-header'>
            {Object.keys(songs).length>0
                ? <div>
                    <p>{mode} Mode - Round {round>6 ? 6 : round}</p>
                    <GuessList className='Guess-box'/>
                    
                    {chosenSongName && <AudioPlayer url={songs[chosenSongName]} round={round}/>}
                    <Autocomplete
                        options={Object.keys(songs)}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={(option) => option}
                        filterOptions={filterOptions}
                        inputValue={inputValue}
                        onInputChange={handleInputChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Guess a song" />
                        )}
                    />
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
