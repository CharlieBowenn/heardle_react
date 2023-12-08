import React, {useState, useEffect, useRef, useCallback} from 'react'
import {IoPlaySharp, IoPauseSharp} from 'react-icons/io5'

export default function Controls({audioRef, progressBarRef, duration, setTimeProgress, round}) {
    const roundTimings = {
        1: 1,
        2: 3,
        3: 5,
        4: 10,
        5: 20,
        6: 30
      }
    const [playing, setPlaying] = useState(false)
    const toggle = () => {
        setPlaying(!playing)
    }
    // useEffect(() => {
    //     if(playing) {
    //         audioRef.current.play()
    //     } else {
    //         audioRef.current.pause()
    //     }
    // }, [playing, audioRef])

    const playAnimationRef = useRef();
    const repeat = useCallback(() => {
        // console.log((progressBarRef.current.value / duration) * 100)
        const currentTime = audioRef.current.currentTime
        console.log(currentTime)
        setTimeProgress(currentTime)
        progressBarRef.current.value = currentTime
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
          );
        if (currentTime<roundTimings[round]) {
            playAnimationRef.current = requestAnimationFrame(repeat)
        } else {
            setPlaying((playing) => !playing)
            audioRef.current.currentTime=0
            setTimeProgress(audioRef.current.currentTime)
            progressBarRef.current.value = audioRef.current.currentTime
            progressBarRef.current.style.setProperty(
                '--range-progress',
                `${(progressBarRef.current.value / duration) * 100}%`
            );
        }
        
    }, [audioRef, duration, progressBarRef, setTimeProgress, round])

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
