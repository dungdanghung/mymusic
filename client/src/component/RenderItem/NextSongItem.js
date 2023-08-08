import "./NextSongItem.scss"
import { faHeart as untHeart } from "@fortawesome/free-regular-svg-icons"
import iconplaying_gif from "../../data/img/icon-playing.gif"
import { faEllipsis, faPlay, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { baseimage } from "../../fetch/index"
import { DeleteHeartInteract, SetheartInteract } from "../../fetch/song"

function NextSong_Item({ data, playing, type, callback }) {
    function handleheartplaylistnextmusicclick(e) {
        if (e.target.children[0].style.display === "none") {
            e.target.children[0].style.display = "block"
            e.target.children[1].style.display = "none"
            SetheartInteract(data.songID)
                .then((rs) => {
                    callback(rs)
                })
        } else {
            e.target.children[0].style.display = "none"
            e.target.children[1].style.display = "block"
            DeleteHeartInteract(data.songID)
        }
    }


    if (data) {
        if (type === "play") {
            return (
                <div className="nextsong__item nextsong__active" >
                    <div className="nextsong__item-img">
                        <div className="nextsong__item-playbtn">
                            <img src={`${baseimage}thumbnailsong/${data.image}`} />
                        </div>
                        <div className="songs-item-left-img-playing-box" style={{ display: playing ? "flex" : "none" }}>
                            <img className="songs-item-left-img-playing" src={iconplaying_gif} alt="playing" />
                        </div>
                        <div className="songs-item-left-play-icon" style={{ display: playing ? "none" : "flex" }}>
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    </div>
                    <div className="nextsong__item-body">
                        <span className="nextsong__item-body-heading ">{data.songName}</span>
                        <span className="nextsong__item-body-depsc ">{data.singer}</span>
                    </div>
                    <div className="nextsong__item-action">
                        <span className="nextsong__item-action-heart" onClick={handleheartplaylistnextmusicclick}>
                            <FontAwesomeIcon icon={faHeart} style={{ display: data.heart ? "block" : "none" }} />
                            <FontAwesomeIcon icon={untHeart} style={{ display: data.heart ? "none" : "block" }} />
                        </span>
                        <span className="nextsong__item-action-dot">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="nextsong__item" >
                    <div className="nextsong__item-img">
                        <div className="nextsong__item-playbtn">
                            <img src={`${baseimage}thumbnailsong/${data.image}`} />
                        </div>
                        <div className="songs-item-left-img-playing-box" style={{ display: "none" }}>
                            <img className="songs-item-left-img-playing" src={iconplaying_gif} alt="playing" />
                        </div>
                        <div className="songs-item-left-play-icon" style={{ display: "flex" }}>
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    </div>
                    <div className="nextsong__item-body">
                        <span className="nextsong__item-body-heading ">{data.songName}</span>
                        <span className="nextsong__item-body-depsc ">{data.singer}</span>
                    </div>
                    <div className="nextsong__item-action">
                        <span className="nextsong__item-action-heart" onClick={handleheartplaylistnextmusicclick}>
                            <FontAwesomeIcon icon={faHeart} style={{ display: data.heart ? "block" : "none" }} />
                            <FontAwesomeIcon icon={untHeart} style={{ display: data.heart ? "none" : "block" }} />
                        </span>
                        <span className="nextsong__item-action-dot">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </span>
                    </div>
                </div>
            )
        }
    }
}


export default NextSong_Item