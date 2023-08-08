import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faBackwardStep, faForwardStep, faRepeat, faCirclePause } from "@fortawesome/free-solid-svg-icons"
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons"
import { useState, useRef, useEffect } from "react"
import { useSongData, SONG_ACTION } from "../../../context/songContext"
import { SetHistorySong } from "../../../fetch/song"

function MainItemMusicController({ data }) {
    const [, dispatchSong] = useSongData()
    const audio = useRef();
    const [btn_playofpause, set_btn_playofpause] = useState(true);
    const [currentimevalue, setcurrentimevalue] = useState("0:00");
    const [duration, setduration] = useState("0:00");
    const [currentTimeupdate, setcurrentTimeupdate] = useState(true)
    const [loop, setloop] = useState(false)
    const [next, setnext] = useState(false)

    function handlechangbtnplayofpause(e) {
        if (!btn_playofpause) {
            set_btn_playofpause(true)
            audio.current.pause()
            dispatchSong({ type: SONG_ACTION.PAUSE })
        } else {
            set_btn_playofpause(false)
            audio.current.play()
            dispatchSong({ type: SONG_ACTION.PLAY })
        }
    }
    function Handlemousedow(e) {
        handlethanhchayplay({}, (e.nativeEvent.offsetX / e.target.clientWidth * 100))
        let maxoffsetx = e.screenX + e.target.clientWidth - e.nativeEvent.offsetX
        let minoffsetx = maxoffsetx - e.target.clientWidth
        let main = maxoffsetx - minoffsetx
        setcurrentTimeupdate(false)
        function callhandlemousemove(even) {
            handlemousemove(even, main, minoffsetx)
        }
        function removeevent(e) {
            window.removeEventListener("mousemove", callhandlemousemove)
            window.removeEventListener("mouseup", removeevent)
            setcurrentTimeupdate(true)
            document.getElementById("music").currentTime = (((e.screenX - minoffsetx) / main * 100) * document.getElementById("music").duration / 100)
        }
        window.addEventListener("mousemove", callhandlemousemove)
        window.addEventListener("mouseup", removeevent)
    }

    function handlemousemove(e, main, min) {
        let value = (e.screenX - min) / main * 100;
        if (value > 0 && value < 100) {
            handlecurenttime(parseInt(value.toFixed(2) / 100 * audio.current.duration))()
        } else if (value <= 0) {
            handlecurenttime(0.1)()
        } else if (value >= 100) {
            handlecurenttime(audio.current.duration)()
        }
        if (value <= 0) handlethanhchayplay({}, 0);
        else if (value >= 100) handlethanhchayplay({}, 100);
        else handlethanhchayplay({}, value)
    }
    function handlethanhchayplay(elemen, check = false) {
        if (check !== false) {
            document.querySelector(".timemusicitem").style.background = `linear-gradient(to right, black ${(check)}%, #fff 0%)`
        } else {
            document.querySelector(".timemusicitem").style.background = `linear-gradient(to right, black ${(elemen.currentTime / elemen.duration * 100)}%, #fff 0%)`
        }
    }

    function setdurationtime(value) {
        let a = Math.floor(value / 60)
        let b = Math.floor(value - a * 60)
        if (b < 10) {
            b = "0" + b
        }
        setduration(`${a}:${b}`)
    }

    function handlecurenttime(data = false) {
        return (e) => {
            if (currentTimeupdate && data === false) {
                let a = Math.floor(audio.current.currentTime / 60)
                let b = Math.floor(audio.current.currentTime - a * 60)
                if (b < 10) {
                    b = "0" + b
                }
                setcurrentimevalue(`${a}:${b}`)
                handlethanhchayplay(audio.current)
            } else {
                if (data) {
                    let a = Math.floor(data / 60)
                    let b = Math.floor(data - a * 60)
                    if (b < 10) {
                        b = "0" + b
                    }
                    setcurrentimevalue(`${a}:${b}`)
                }
            }
        }
    }

    function handlebtnaction(e) {
        // if (e.target.className.includes("active")) {
        //     // e.target.classList.remove("active")
        //     if (e.target.className.includes("loop")) {
        //         setloop(false)
        //     } else if (e.target.className.includes("next")) {
        //         setnext(false)
        //     }
        // } else {
        //     e.target.classList.add("active")
        //     if (e.target.className.includes("loop")) {
        //         if (next) {
        //             setnext(false)
        //             setloop(true)
        //         }
        //     } else if (e.target.className.includes("next")) {
        //         if (loop) {
        //             setloop(false)
        //             setnext(true)
        //         }
        //     }
        // }
        if (e.target.className.includes("loop")) {
            if (loop) {
                setloop(false)
            } else {
                if (next) setnext(false)
                setloop(true)
            }
        } else {
            if (next) {
                setnext(false)
            } else {
                if (loop) setloop(false)
                setnext(true)
            }
        }
    }
    function nextofprivesongdown(e) {
        e.target.classList.add("active")
    }
    function nextofprivesongup(e) {
        e.target.classList.remove("active")
        if (e.target.className.includes("next")) {
            dispatchSong({ type: SONG_ACTION.PAUSE });
            dispatchSong({ type: SONG_ACTION.NEXT })
        } else {
            dispatchSong({ type: SONG_ACTION.PAUSE });
            dispatchSong({ type: SONG_ACTION.BACK })
        }
    }

    useEffect(() => {
        if (data && data.play) {
            audio.current.play()
            set_btn_playofpause(false)
        } else if (data && !data.play) {
            set_btn_playofpause(true)
            audio.current.pause()
        }
    }, [data])

    return (
        <div className="itemplaymusic">
            <div className='controplay'>
                <div className={`cssbtnplay next ${next ? 'active' : ""}`} onClick={handlebtnaction}><FontAwesomeIcon icon={faShuffle} /></div>
                <div className='cssbtnplay back' onMouseDown={nextofprivesongdown} onMouseUp={nextofprivesongup}><FontAwesomeIcon icon={faBackwardStep} /></div>
                <div className='cssbtnplaymusic' onClick={handlechangbtnplayofpause}>
                    <FontAwesomeIcon icon={faCirclePlay} className={`playclick ${btn_playofpause ? "" : "activebtnplay"}`} />
                    <FontAwesomeIcon icon={faCirclePause} className={`pauseclick ${btn_playofpause ? "activebtnplay" : ""}`} />
                </div>
                <div className='cssbtnplay next' onMouseDown={nextofprivesongdown} onMouseUp={nextofprivesongup}><FontAwesomeIcon icon={faForwardStep} /></div>
                <div className={`cssbtnplay loop ${loop ? 'active' : ""}`} onClick={handlebtnaction}><FontAwesomeIcon icon={faRepeat} /></div>
            </div>
            <div className="musicplaying">
                <div className="wrapmusicplaying">
                    <p className="starttime">{currentimevalue}</p>
                    <div className="timemusic" onMouseDown={Handlemousedow}>
                        <div className="timemusicitem" style={{ background: "linear-gradient(to right, black 0%, #fff 0%)" }}>
                        </div>
                    </div>
                    <p className="endtime">{duration}</p>
                </div>
                {
                    data ?
                        <>
                            <audio ref={audio}
                                id="music"
                                src={data.music}
                                onEnded={async () => {
                                    await SetHistorySong(data.songID)
                                    if (!loop && next) {
                                        set_btn_playofpause(true);
                                        dispatchSong({ type: SONG_ACTION.PAUSE });
                                        dispatchSong({ type: SONG_ACTION.NEXT })
                                    } else if (loop && !next) {
                                        audio.current.play()
                                    } else {
                                        dispatchSong({ type: SONG_ACTION.PAUSE });
                                    }
                                }}
                                onTimeUpdate={handlecurenttime()}
                                onLoadedMetadata={(e) => { setdurationtime(e.target.duration) }}
                            ></audio>
                        </>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export default MainItemMusicController