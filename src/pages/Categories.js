import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PicButton from '../components/PicButton'
import RapImg from '../pics/Rap.png'
import RockImg from '../pics/Rock.png'
import axios from 'axios'

export default function Categories() {
    const [chosenPlaylist, setChosenPlaylist] = useState({})
    const playlists = {
        'rap': 'UK RAP BANGERS',
        'rock': 'Rock Classics'
    }

    const getPlaylist = async (e) => {
        const {data} = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            params: {
                q: playlists[e],
                type: 'playlist'
            }
        })

        let url = data.playlists.items[0].tracks['href']
        let available = {}
        while(true) {
            const newData = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            });

            for(var x=0; x<newData.data.items.length; x++) {
                const song = newData.data.items[x].track
                if(song.preview_url) {
                    available[song.name] = song.preview_url
                }
            }

            url = newData.data.next
            if(!url) {
                break
            }
        }
        setChosenPlaylist(available)
        console.log('available')
        console.log(available)
        console.log('chosenPlaylist')
        console.log(chosenPlaylist)
    }
    //PROBLEM WITH ASYNC
    //BELOW FUNCTION CALLS getPlaylist, BUT THEN CALLS NAVIGATE BEFORE getPlaylist HAS COMPLETED
    //SO CHOSENPLAYLIST HASN'T BEEN SET, SO NOT TRANSFERRED TO NEXT SCREEN
    const navigate = useNavigate();
    function handleClick(page) {
        getPlaylist(page)
        console.log(chosenPlaylist)
        navigate(`/game/${page}`, {state: {songs: chosenPlaylist}})
    }

    function handleHomeClick() {
        navigate('/home')
    }

    const renderPlaylists = () => {
        // return chosenPlaylist.map(playlist => (
        //     <div key={playlist.id}>
        //         {playlist.name}
        //     </div>
        // ))
        return (
            <div>{chosenPlaylist.name}</div>
        )
    }

  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p className='title-text'>Choose a Category</p>
            <div className='pic-button-container'>
                <PicButton imgPath={RapImg} onClick={() => handleClick('rap')} caption='Rap' style='rap-text' />
                <PicButton imgPath={RockImg} onClick={() => handleClick('rock')} caption='Rock' style='rock-text' />
            </div>
            <button type='button' onClick={() => handleHomeClick()}>Return to home</button>
            <div>Playlist name: {renderPlaylists()}</div>
            
        </header>
    </div>
  )
}
