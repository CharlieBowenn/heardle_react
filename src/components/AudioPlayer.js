import React, {useEffect, useState, useRef} from 'react'
import ProgressBar from './ProgressBar';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';

export default function AudioPlayer({ url }) {
    // const [audio] = useState(new Audio(url));
    // const [playing, setPlaying] = useState(false);
    // const toggle = () => {
    //     setPlaying(!playing);
    // }
    // const progressBarRef = useRef();
    // const audioRef = useRef();

    // //If stops working, add async in front of this function
    // function playSong() {
    //     if(audio.paused) {
    //         audio.play();
    //     }
    // }
    // function pauseSong() {
    //     if(!audio.paused) {
    //         audio.pause();
    //     }
    // }

    // useEffect(() => {
    //     playing ? playSong() : pauseSong()
    // }, [playing])

    // const onLoadedMetadata = () => {
    //     const seconds = audioRef.current.duration
    //     progressBarRef.current.max = seconds
    // }
    
    // return (
    //     <div>
    //         <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    //         <audio src={url} ref={audioRef} onLoadedMetadata={onLoadedMetadata}/>
    //         <ProgressBar ProgressBarRef={{progressBarRef, audioRef}}/>
    //     </div>
    // )


    const [timeProgress, setTimeProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef();
    const progressBarRef = useRef();


    return ( 
        <div className='audio-player'>
            <div className="inner">
                <DisplayTrack
                    {...{url, audioRef, setDuration, progressBarRef}}
                />
                <Controls
                    {...{audioRef, progressBarRef, duration, setTimeProgress}}
                />
                <ProgressBar
                    {...{progressBarRef, audioRef, timeProgress, duration}}
                />
            </div>
        </div>
    )
}
