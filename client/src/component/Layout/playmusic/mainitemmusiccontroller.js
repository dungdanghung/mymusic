import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faBackwardStep, faForwardStep, faRepeat, faCirclePause } from "@fortawesome/free-solid-svg-icons"
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons"
import { useState, useRef } from "react"

function MainItemMusicController({ data }) {
    const audio = useRef();
    const [btn_playofpause, set_btn_playofpause] = useState(true);
    const [currentimevalue, setcurrentimevalue] = useState("0:00");
    const [duration, setduration] = useState("0:00");
    const [currentTimeupdate, setcurrentTimeupdate] = useState(true)

    function handlechangbtnplayofpause(e) {
        if (!btn_playofpause) {
            set_btn_playofpause(true)
            audio.current.pause()
        } else {
            set_btn_playofpause(false)
            audio.current.play()
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
        } else if (value < 0.5) {
            handlecurenttime(0)()
        } else {
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
            if (currentTimeupdate && !data) {
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

    return (
        <div className="itemplaymusic">
            <div className='controplay'>
                <div className='cssbtnplay active'><FontAwesomeIcon icon={faShuffle} /></div>
                <div className='cssbtnplay'><FontAwesomeIcon icon={faBackwardStep} /></div>
                <div className='cssbtnplaymusic' onClick={handlechangbtnplayofpause}>
                    <FontAwesomeIcon icon={faCirclePlay} className={`playclick ${btn_playofpause ? "" : "activebtnplay"}`} />
                    <FontAwesomeIcon icon={faCirclePause} className={`pauseclick ${btn_playofpause ? "activebtnplay" : ""}`} />
                </div>
                <div className='cssbtnplay'><FontAwesomeIcon icon={faForwardStep} /></div>
                <div className='cssbtnplay'><FontAwesomeIcon icon={faRepeat} /></div>
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
                            <audio ref={audio} id="music" src={data.music} onEnded={() => { set_btn_playofpause(true) }} onTimeUpdate={handlecurenttime()} onLoadedMetadata={(e) => { setdurationtime(e.target.duration) }}></audio>
                        </>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export default MainItemMusicController