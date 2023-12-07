import React, {useEffect, useState, useRef} from 'react'
import ProgressBar from './ProgressBar';

export default function AudioPlayer({ url }) {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const toggle = () => {
        setPlaying(!playing);
    }
    const progressBarRef = useRef();
    const audioRef = useRef();

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
            <div>
                <button onClick={toggle} position='MiddleCenter'>{playing ? "Pause" : "Play"}</button>
            </div>
            <div>
                <ProgressBar ProgressBarRef={progressBarRef}/>
            </div>
        </div>
    )
}
