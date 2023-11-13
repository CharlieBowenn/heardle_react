import React from 'react'
import { useNavigate } from 'react-router-dom';
import PicButton from '../components/PicButton'
import RapImg from '../pics/Rap.png'
import RockImg from '../pics/Rock.png'

export default function Categories() {
    const navigate = useNavigate();
    function handleClick(page) {
        navigate(page)
    }
  return (
    <div className='AppStyle'>
        <header className='App-header'>
            <p className='title-text'>Choose a Category</p>
            <div className='pic-button-container'>
                <PicButton imgPath={RapImg} onClick={() => handleClick('/game/rap')} caption='Rap' style='rap-text' />
                <PicButton imgPath={RockImg} onClick={() => handleClick('/game/rock')} caption='Rock' style='rock-text' />
            </div>
            <button type='button' onClick={() => handleClick('/home')}>Return to home</button>
        </header>
    </div>
  )
}
