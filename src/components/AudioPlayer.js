import React, {useEffect, useState} from 'react'

export default function AudioPlayer({ url }) {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        setPlaying(!playing);
    }

    //If stops working, add async in front of this function
    function playSong() {
        if(audio.paused) {
            audio.play();
        }
    }
    function pauseSong() {
        if(!audio.paused) {
            audio.pause();
        }
    }

    useEffect(() => {
        playing ? playSong() : pauseSong()
    }, [playing])
    
    return (
        <div>
            <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
    )
}
