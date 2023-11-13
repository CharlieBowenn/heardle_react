import React from 'react'
import './PicButton.css'

export default function PicButton({ imgPath, onClick, caption, style }) {
  return (
    <button type='button' onClick={onClick} className='pic-button'>
        <img src={imgPath} width={250} height={250}/>
        <div className={style}>{caption}</div>
    </button>
  )
}