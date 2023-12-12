import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PicButton from '../components/PicButton'
import RapImg from '../pics/Rap.png'
import RockImg from '../pics/Rock.png'
import EightiesImg from '../pics/Eighties.jpg'
import axios from 'axios'

export default function Categories() {
    const [chosenPlaylist, setChosenPlaylist] = useState({})
    let available = {}

    const playlists = {
        'Rap': 'UK RAP BANGERS',
        'Rock': 'Rock Classics',
        '80s': '80s Hits'
    }
    const getPlaylist = async (e) => {
        //Get list of all playlists that appear on initial search
        const {data} = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            params: {
                q: playlists[e],
                type: 'playlist'
            }
        })

        //Choose specific playlist out of list of all playlists
        let url = data.playlists.items[0].tracks['href']
        while(true) {
            const newData = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            });

            for(var x=0; x<newData.data.items.length; x++) {
                const song = newData.data.items[x].track
                // console.log(`${song.name} - ${song.artists[0].name}`)
                if(song.preview_url) {
                    available[`${song.name} - ${song.artists[0].name}`] = song.preview_url
                }
            }

            url = newData.data.next
            if(!url) {
                break
            }
        }
        // setChosenPlaylist(available)
    }

    const navigate = useNavigate();
    function handleClick(page) {
        // getPlaylist(page).then(() => navigate(`/game/${page}`, {state: {songs: available, tester: 'heheh'}}))
        getPlaylist(page).then(() => navigate(`/game`, {state: {songs: available, mode: page}}))
    }

    function handleHomeClick() {
        navigate('/home')
    }


  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p className='title-text'>Choose a Category</p>
            <div className='pic-button-container'>
                <PicButton imgPath={RapImg} onClick={() => handleClick('Rap')} caption='Rap' style='rap-text' />
                <PicButton imgPath={RockImg} onClick={() => handleClick('Rock')} caption='Rock' style='rock-text' />
                <PicButton imgPath={EightiesImg} onClick={() => handleClick('80s')} caption='80s' style='rock-text' />
            </div>
            <button type='button' onClick={() => handleHomeClick()}>Return to home</button>            
        </header>
    </div>
  )
}
