import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons"
import dung_React_scrollbar from "../../../component/Layout/scroll";
import { useEffect, useState } from "react";
import { GetSongHot, GetHistory, GetHeartSongs } from "../../../fetch/song"
import NextSong_Item from "../../RenderItem/NextSongItem";
import { useSongData, SONG_ACTION } from "../../../context/songContext"
import { useNavigate } from "react-router-dom"

function ListNextSong() {
    const [typeoflistnextsong, settypeoflistnextsong] = useState('hot')
    const [listsong, setlistsong] = useState([])
    const [listsongtop, setlistsongtop] = useState([])
    const [listsongbottom, setlistsongbottom] = useState([])
    const [listhistory, setlisthistory] = useState([])
    const [listheart, setlistheart] = useState([])
    const [stateplay, setstateplay] = useState("hot")
    const [song, dispatchSong] = useSongData()
    const navigate = useNavigate()

    function HandleNextSongLastListClick(e) {
        if (e.target.className === "nextsong__item-img") {
            const a = parseInt(e.target.parentElement.parentElement.id)
            const b = listsongbottom.find(item => item.songID === a)
            const newlistsongbottom = listsongbottom.filter(item => item.songID !== a)
            if (stateplay !== "hot") setstateplay("hot")
            setlistsongbottom(newlistsongbottom)
            setlistsongtop([...listsongtop, b])
            document.querySelector(".nextsong__active")?.classList.remove("nextsong__active")
            dispatchSong({ type: SONG_ACTION.SET, payload: b })
            dispatchSong({ type: SONG_ACTION.PLAY })
        }
    }
    function nextsongitemclick(e) {
        if (!e.target.parentElement.className?.includes("nextsong__active") && e.target.className === "nextsong__item-img") {
            document.querySelector(".nextsong__active")?.classList.remove("nextsong__active")
            e.target.parentElement.classList.add("nextsong__active")
            const b = parseInt(e.target.parentElement.parentElement.id)
            if (typeoflistnextsong === "hot") {
                if (stateplay !== "hot") setstateplay("hot")
                const c = listsongtop.find(item => item.songID === b)
                dispatchSong({ type: SONG_ACTION.SET, payload: c })
            } else if (typeoflistnextsong === "history") {
                if (stateplay !== "history") setstateplay("history")
                const c = listhistory.find(item => item.songID === b)
                dispatchSong({ type: SONG_ACTION.SET, payload: c })
            } else if (typeoflistnextsong === "heart") {
                if (stateplay !== "heart") setstateplay("heart")
                const c = listheart.find(item => item.songID === b)
                dispatchSong({ type: SONG_ACTION.SET, payload: c })
            }
        }
        if (!e.target.parentElement.className.includes("play") && e.target.className === "nextsong__item-img") {
            document.querySelector(".play")?.classList.remove("play")
            e.target.parentElement.classList.add("play")
            dispatchSong({ type: SONG_ACTION.PLAY })
        } else {
            e.target.parentElement.classList.remove("play")
            dispatchSong({ type: SONG_ACTION.PAUSE })
        }
    }
    function gethistory() {
        GetHistory()
            .then((rs) => {
                setlisthistory(rs)
            })
            .then(() => {
                settypeoflistnextsong('history')
            })
            .catch(() => {
                navigate("/login")
            })
    }
    function gethotsong() {
        settypeoflistnextsong('hot')
    }
    function getheartsongs() {
        GetHeartSongs()
            .then((rs) => {
                setlistheart(rs)
            })
            .then(() => {
                settypeoflistnextsong('heart')
            })
            .catch(() => {
                navigate("/login")
            })
    }
    useEffect(() => {
        if (song) {
            if (song.play) {
                document.querySelector(".nextsong__active")?.classList.add("play")
            } else {
                document.querySelector(".nextsong__active")?.classList.remove("play")
            }
        }
    }, [song])
    useEffect(() => {
        const a = document.querySelector(".wrap__nextsong__box")
        if (a) {
            dung_React_scrollbar(a)
        }
    }, [listsong])
    useEffect(() => {
        GetSongHot()
            .then((rs) => {
                if (rs.length !== 0) {
                    setlistsong(rs)
                    setlistsongtop([rs[0]])
                    setlistsongbottom(rs.filter((item, index) => { if (index > 0) return item }))
                    dispatchSong({ type: SONG_ACTION.SET, payload: rs[0] })
                }
            })
    }, [])
    useEffect(() => {
        if (song?.next) {
            if (stateplay === "hot") {
                let a = listsongbottom[0]
                const lastitem = listsongtop.at(-1)
                if (lastitem.songID !== song.songID) {
                    const item = listsongtop.find(item => item.songID === song.songID)
                    const index = listsongtop.indexOf(item) + 1
                    if (index !== -1 && index < listsongtop.length) {
                        a = listsongtop[index]
                        document.querySelector(".nextsong__active")?.classList.remove("nextsong__active")
                        dispatchSong({ type: SONG_ACTION.SET, payload: a })
                        dispatchSong({ type: SONG_ACTION.PLAY })
                    }
                    return
                }
                setlistsongbottom(listsongbottom.slice(1))
                document.querySelector(".nextsong__active")?.classList.remove("nextsong__active")
                setlistsongtop([...listsongtop, a])
                dispatchSong({ type: SONG_ACTION.SET, payload: a })
                dispatchSong({ type: SONG_ACTION.PLAY })
            } else if (stateplay === "history") {
                const item = listhistory.find(item => item.songID === song.songID)
                const index = listhistory.indexOf(item) + 1
                if (listhistory[index]) {
                    document.querySelector(".nextsong__active")?.classList.remove("nextsong__active")
                    dispatchSong({ type: SONG_ACTION.SET, payload: listhistory[index] })
                    dispatchSong({ type: SONG_ACTION.PLAY })
                }
            } else if (stateplay === "heart") {
                const item = listheart.find(item => item.songID === song.songID)
                const index = listheart.indexOf(item) + 1
                if (listheart[index]) {
                    document.querySelector(".nextsong__active")?.classList.remove("nextsong__active")
                    dispatchSong({ type: SONG_ACTION.SET, payload: listheart[index] })
                    dispatchSong({ type: SONG_ACTION.PLAY })
                }
            }
        }
    }, [song?.next])
    useEffect(() => {
        if (song?.back) {
            let item, index, newplay
            if (stateplay === 'hot') {
                item = listsongtop.find(item => item.songID === song.songID)
                index = listsongtop.indexOf(item) - 1
                if (index !== -1 && index >= 0) {
                    newplay = listsongtop[index]
                }
            } else if (stateplay === 'history') {
                item = listhistory.find(item => item.songID === song.songID)
                index = listhistory.indexOf(item) - 1
                if (index !== -1 && index >= 0) {
                    newplay = listhistory[index]
                }
            } else if (stateplay === 'heart') {
                item = listheart.find(item => item.songID === song.songID)
                index = listheart.indexOf(item) - 1
                if (index !== -1 && index >= 0) {
                    newplay = listheart[index]
                }
            }
            if (newplay) {
                document.querySelector(".nextsong__active")?.classList.remove("nextsong__active")
                dispatchSong({ type: SONG_ACTION.SET, payload: newplay })
                dispatchSong({ type: SONG_ACTION.PLAY })
            }
        }
    }, [song?.back])

    function callbackrefeshlistsonghot(songid) {
        const item = listsong.find(item => item.songID === songid)
        if (item) {
            let index = listsong.indexOf(item)
            const a = listsong[index]
            a['heart'] = true
            let newlistsong = listsong
            newlistsong.splice(index, 1, a)
            setlistsong(newlistsong)
        }
        if (listsongtop.includes(item)) {
            let index = listsongtop.indexOf(item)
            const a = listsongtop[index]
            a['heart'] = true
            let newlistsongtop = listsongtop
            newlistsongtop.splice(index, 1, a)
            setlistsongtop(newlistsongtop)
        }
        if (listsongbottom.includes(item)) {
            let index = listsongbottom.indexOf(item)
            const a = listsongbottom[index]
            a['heart'] = true
            let newlistsongbottom = listsongbottom
            newlistsongbottom.splice(index, 1, a)
            setlistsongbottom(newlistsongbottom)
        }
    }

    return (
        <div className="listmusic">
            <div className="nextsong__option">
                <div className="nextsong__option-wrapper">
                    <div
                        className={`nextsong__option-wrapper-listplay ${typeoflistnextsong === "hot" ? "nextsong__option-wrapper--active" : ""}`} onClick={gethotsong}>
                        Danh sách phát</div>
                    <div
                        className={`nextsong__option-wrapper-listplay ${typeoflistnextsong === "history" ? "nextsong__option-wrapper--active" : ""}`} onClick={gethistory}>
                        Nghe gần đây</div>
                </div>
                <div className="nextsong__option-alarm" onClick={getheartsongs}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className="nextsong__option-more">
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            <div className="wrap__nextsong__box">
                <div className="nextsong__box">
                    {listsong.length !== 0 && typeoflistnextsong === 'hot' ?
                        <>
                            <ul className="wrapnextsong__box" >
                                {
                                    listsongtop.map((item) => {
                                        return (
                                            stateplay === "hot" ?
                                                <li key={item.songID} className="nextsong__fist" id={item.songID} onClick={nextsongitemclick}>
                                                    <NextSong_Item callback={callbackrefeshlistsonghot} data={item} playing={song.play} type={song?.songID === item.songID ? "play" : "base"} />
                                                </li> :
                                                <li key={item.songID} className="nextsong__fist" id={item.songID} onClick={nextsongitemclick}>
                                                    <NextSong_Item callback={callbackrefeshlistsonghot} data={item} type={"base"} />
                                                </li>
                                        )
                                    })
                                }
                            </ul>
                            <h3 className="nextsong__last-heading">Tiếp theo</h3>
                            <div className="nextsong__last">
                                <ul className="nextsong__last-list" >
                                    {
                                        listsongbottom.map((item) => {
                                            return <li key={item.songID} className="nextsong__fist" id={item.songID} onClick={HandleNextSongLastListClick}>
                                                <NextSong_Item callback={callbackrefeshlistsonghot} data={item} type={"base"} />
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </> :
                        <></>
                    }
                    {listhistory.length !== 0 && typeoflistnextsong === 'history' ?
                        <div className="nextsong__last">
                            <ul className="nextsong__last-list" >
                                {
                                    listhistory.map((item) => {
                                        return (
                                            stateplay === "history" ?
                                                <li key={item.songID} className="nextsong__fist" id={item.songID} onClick={nextsongitemclick}>
                                                    <NextSong_Item callback={callbackrefeshlistsonghot} data={item} playing={song.play} type={song?.songID === item.songID ? "play" : "base"} />
                                                </li> :
                                                <li key={item.songID} className="nextsong__fist" id={item.songID} onClick={nextsongitemclick}>
                                                    <NextSong_Item callback={callbackrefeshlistsonghot} data={item} type={"base"} />
                                                </li>
                                        )
                                    })
                                }
                            </ul>
                        </div> :
                        <></>
                    }
                    {listheart.length !== 0 && typeoflistnextsong === 'heart' ?
                        <div className="nextsong__last">
                            <ul className="nextsong__last-list" >
                                {
                                    listheart.map((item) => {
                                        return (
                                            stateplay === "heart" ?
                                                <li key={item.songID} className="nextsong__fist" id={item.songID} onClick={nextsongitemclick}>
                                                    <NextSong_Item callback={callbackrefeshlistsonghot} data={item} playing={song.play} type={song?.songID === item.songID ? "play" : "base"} />
                                                </li> :
                                                <li key={item.songID} className="nextsong__fist" id={item.songID} onClick={nextsongitemclick}>
                                                    <NextSong_Item callback={callbackrefeshlistsonghot} data={item} type={"base"} />
                                                </li>
                                        )
                                    })
                                }
                            </ul>
                        </div> :
                        <></>
                    }
                </div>
            </div>
        </div >
    )
}


export default ListNextSong