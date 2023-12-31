import React from 'react'
import './ProgressBar.css'

export default function ProgressBar({ progressBarRef, audioRef, timeProgress, duration }) {
    const handleProgressChange = () => {
        console.log(progressBarRef.current.value)
    }

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
          const minutes = Math.floor(time / 60);
          const formatMinutes =
            minutes < 10 ? `${minutes}` : `${minutes}`;
          const seconds = Math.floor(time % 60);
          const formatSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`;
          return `${formatMinutes}:${formatSeconds}`;
        }
        return '0:00';
      };

    return (
        <div className="progress">
            <span className="time current">{formatTime(timeProgress)}</span>
            <input 
                type="range"
                disabled={true} 
                ref={progressBarRef}
                defaultValue='0'
                onChange={handleProgressChange}
            />
            {/* <span className="time">{formatTime(duration)}</span> */}
        </div>
    )
}
