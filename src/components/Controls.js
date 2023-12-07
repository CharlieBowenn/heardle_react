import React, {useState, useEffect, useRef, useCallback} from 'react'
import {IoPlaySharp, IoPauseSharp} from 'react-icons/io5'

export default function Controls({audioRef, progressBarRef, duration, setTimeProgress}) {
    const [playing, setPlaying] = useState(false)
    const toggle = () => {
        setPlaying(!playing)
    }
    useEffect(() => {
        if(playing) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [playing, audioRef])

    const playAnimationRef = useRef();
    const repeat = useCallback(() => {
        console.log((progressBarRef.current.value / duration)*100)
        const currentTime = audioRef.current.currentTime
        setTimeProgress(currentTime)
        progressBarRef.current.value = currentTime
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
          );
        playAnimationRef.current = requestAnimationFrame(repeat)
    }, [audioRef, duration, progressBarRef, setTimeProgress])

    useEffect(() => {
        if(playing) {
            audioRef.current.play();
            playAnimationRef.current = requestAnimationFrame(repeat)
        } else {
            audioRef.current.pause()
            cancelAnimationFrame(playAnimationRef.current)
        }
    }, [playing, audioRef, repeat])


    return (
        <div>
            <button onClick={toggle}>
                {playing ? <IoPauseSharp /> : <IoPlaySharp />}
            </button>
        </div>
    )
}
