import "./index.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import dung_React_scrollbar from "../../../component/Layout/scroll";
import { useEffect, useState } from "react";
import { GetSongHot } from "../../../fetch/song"
import NextSong_Item from "../../RenderItem/NextSongItem";
import { useSongData, SONG_ACTION } from "../../../context/songContext"

function ListNextSong() {
    const [listsong, setlistsong] = useState([])
    const [, dispatchSong] = useSongData()

    function HandleNextSongLastListClick(e) {
        if (e.target.className === "nextsong__item-img") {
            e.target.parentElement.parentElement.remove()
        }
    }


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
                    dispatchSong({ type: SONG_ACTION.SET, payload: rs[0] })
                }
            })
    }, [])
    return (
        <div className="listmusic">
            <div className="nextsong__option">
                <div className="nextsong__option-wrapper">
                    <div
                        className="nextsong__option-wrapper-listplay nextsong__option-wrapper--active">
                        Danh sách phát</div>
                    <div className="nextsong__option-wrapper-listplay">Nghe gần đây</div>
                </div>
                <div className="nextsong__option-alarm">
                    <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="nextsong__option-more">
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            {listsong.length !== 0 ?
                <div className="wrap__nextsong__box">
                    <div className="nextsong__box">
                        <div className="nextsong__fist">
                            <NextSong_Item data={listsong[0]} type={"play"} />
                        </div>
                        <h3 className="nextsong__last-heading">Tiếp theo</h3>
                        <div className="nextsong__last">
                            <ul className="nextsong__last-list" onClick={HandleNextSongLastListClick}>
                                {
                                    listsong.map((item, index) => {
                                        if (index > 0) {
                                            return (
                                                <div key={item.songID}>
                                                    <NextSong_Item data={item} type={"base"} />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div> :
                <></>
            }
        </div>
    )
}


export default ListNextSong