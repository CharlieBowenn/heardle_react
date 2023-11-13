import React from 'react'
import { useNavigate } from 'react-router-dom'
import FontStyling from '../FontStyles.css'
import GuitarLogo from '../pics/GuitarLogo.png'

export default function Home() {
    const navigate = useNavigate();
    function handleClick(page) {
        navigate(page)
    }
    return (
        <div className='AppStyle'>
            <header className='App-header'>
                <p className='title-text'>HEARDLE!!!</p>
                <img src={GuitarLogo} className='App-logo' />
                <button type='button' onClick={() => navigate('/categories')}>Let's Play!</button>
            </header>
            
        </div>
    )
}
