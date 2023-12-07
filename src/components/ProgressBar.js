import React from 'react'
import './ProgressBar.css'

export default function ProgressBar({ ProgressBarRef }) {
    const handleProgressChange = () => {
        console.log(ProgressBarRef.current.value)
    }

    return (
        <div className="progress">
            <span className="time current">0:00</span>
            <input 
                type="range"
                // disabled='true' 
                ref={ProgressBarRef}
                defaultValue='0'
                onChange={handleProgressChange}
            />
            <span className="time">5:00</span>
        </div>
    )
}
