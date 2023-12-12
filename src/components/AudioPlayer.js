import React, {useEffect, useState, useRef} from 'react'
import ProgressBar from './ProgressBar';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';

export default function AudioPlayer({ url, round }) {
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
                    {...{audioRef, progressBarRef, duration, setTimeProgress, round}}
                />
                <ProgressBar
                    {...{progressBarRef, audioRef, timeProgress, duration}}
                />
            </div>
        </div>
    )
}
