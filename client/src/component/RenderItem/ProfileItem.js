import "./ProfileItem.scss"
import { baseimage } from "../../fetch/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { faHeart, faComment, faPaperPlane, faBookmark } from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState, useRef } from "react"

function Profile_Item({ data, itembirthday = false }) {
    const [comment, setcomment] = useState("")
    const heightofinputcomment = useRef()

    function handlediskplay(e) {
        const a = e.target.children[1]
        const b = e.target.children[0]
        if (a.style.left !== "0%") {
            a.style.left = "0%"
            b.style.left = "0%"
            a.style.animationPlayState = 'paused';
        } else {
            a.style.left = "30%"
            b.style.left = "-25%"
            a.style.animationPlayState = 'running';
        }
    }

    useEffect(() => {
        heightofinputcomment.current.style.height = "auto"
        heightofinputcomment.current.style.height = heightofinputcomment.current.scrollHeight + "px"
    }, [comment])

    function formatdate(date) {
        let newdate = new Date(date)
        newdate = newdate.toLocaleDateString('en-US')
        newdate = newdate.split("/")
        return `${newdate[0]} Tháng ${newdate[1]}, ${newdate[2]}`
    }

    return (
        <div className="contentitem">
            <div className="headeritemcontent">
                <div className="wrapavatar_nameandtime">
                    <div className="avatar">
                        <img src={`${baseimage}/avatar/${data.avatar}`} />
                    </div>
                    <div className="nameandtime">
                        <div className="name">{data.userName}</div>
                        {
                            itembirthday ?
                                <div className="time">{formatdate(data.birth)}</div>
                                :
                                <div className="time">{ }</div>
                        }
                    </div>
                </div>
                <div className="more">
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            {
                itembirthday ?
                    <div className="birthimage">
                        <img src="http://localhost:4000/images/orther/birth.jpg" />
                    </div>
                    :
                    <div className="maincontent">
                        <div className="content" onClick={handlediskplay}>
                            <div className="wrapdisk">
                                <img src="http://localhost:4000/images/orther/music_128x128.png" />
                            </div>
                            <div className="disk" style={{ left: "0%", animationPlayState: 'paused' }}>
                                <img src="http://localhost:4000/images/orther/music_128x128.png" />
                            </div>
                        </div>
                    </div>
            }
            <div className="action">
                <div className="wrapaction">
                    <div className="heart">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className="comment">
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    <div className="share">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                </div>
                <div className="save">
                    <FontAwesomeIcon icon={faBookmark} />
                </div>
            </div>
            <div className="countofheart">
                <span>1000 Lượt thích</span>
            </div>
            {
                itembirthday ?
                    <></>
                    :
                    <div className="textcontent">
                        <span> sfljsfjdljfsljfslfjsdlfjlj </span>
                    </div>
            }
            <div className="countcomment">
                <span>Xem tất cả 1000 bình luận</span>
            </div>
            <div className="addcomment">
                <div className="wrapcomment">
                    <textarea
                        ref={heightofinputcomment}
                        onInput={(e) => { setcomment(e.target.value) }}
                        placeholder="Thêm bình luận"
                        value={comment}
                    />
                    <FontAwesomeIcon icon={faLocationArrow} />
                </div>
            </div>
        </div>
    )
}


export default Profile_Item