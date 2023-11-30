import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FontStyling from '../FontStyles.css'
import GuitarLogo from '../pics/GuitarLogo.png'

export default function Home() {
    const CLIENT_ID = 'fad55531967b4fdba101b451a9c0b20b'
    const REDIRECT_URI = 'http://localhost:3000'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem('token')

        if(!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ''
            window.localStorage.setItem('token', token)
            
        }
        setToken(token)
    }, [])

    const navigate = useNavigate();
    function handleClick(page) {
        navigate(page)
    }

    const logout = () => {
        setToken('')
        window.localStorage.removeItem('token')
    }

    return (
        <div className='AppStyle'>
            <header className='App-header'>
                <p className='title-text'>HEARDLE!!!</p>
                <img src={GuitarLogo} className='App-logo' />

                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                        Login to Spotify
                    </a>

                : <button onClick={logout}>Log Out</button>
                }

                {token && <button type='button' onClick={() => navigate('/categories')}>Let's Play!</button>}
            </header>
            
        </div>
    )
}
