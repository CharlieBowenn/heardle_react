import React from 'react'

export default function DisplayTrack({url, audioRef, setDuration, progressBarRef}) {
    const onLoadedMetadata = () => {
        const seconds = Math.floor(audioRef.current.duration)
        setDuration(seconds)
        progressBarRef.max = seconds
    }

    return (
        <div>
            <audio src={url} ref={audioRef} onLoadedMetadata={onLoadedMetadata}/>
        </div>
    )
}
