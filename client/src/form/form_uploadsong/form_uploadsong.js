import "./form_uploadsong.scss"
import { useEffect, useState, useRef } from "react"
import { baseimage } from "../../fetch/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { uploadsong } from "../../fetch/song"
import { useUserData } from "../../context/userContext"

function Form_uploadsong({ closepopup }) {
    const [user] = useUserData()
    const [backgrounduploadtype, setbackgrounduploadtype] = useState("normal")
    const [text, settext] = useState('')
    const [statusoffileinput, setstatusoffileinput] = useState("off")
    const [songname, setsongname] = useState("")
    const [authername, setauthername] = useState("")
    const [imagesong, setimagesong] = useState("")
    const [thumbnailsong, setthumbnailsong] = useState("")
    const heightofinputcomment = useRef()


    function closepopupuploadfile(e) {
        if (e.target.className === "popupthemmoi" || e.target.className === "more") {
            closepopup()
        }
    }
    function uploadfile(e) {
        const file = document.querySelector("#filesong")
        const image = document.querySelector("#imagesong")
        const thumbnail = document.querySelector("#thumbnailsong")
        const data = {
            filesong: file.files[0],
            fileimage: image.files[0],
            filethumbnail: thumbnail.files[0],
            songname: songname,
            imagename: imagesong,
            thumbnailname: thumbnailsong,
            singer: authername
        }
        const checkitem = Array.from(data).every((item) => {
            if (!item) return false
            else return true
        })
        if (!checkitem) {
            console.log("dien day du thong tin")
            return
        } else {
            let token = window.localStorage.getItem("token")
            token = JSON.parse(token)
            uploadsong(data, token.accessToken)
        }
    }
    function changetypeupload(e) {
        if (e.target.className === "normalsong") setbackgrounduploadtype("normal")
        if (e.target.className === "specialsong") setbackgrounduploadtype("special")
    }
    useEffect(() => {
        if (text !== "") {
            heightofinputcomment.current.style.height = "auto"
            heightofinputcomment.current.style.height = heightofinputcomment.current.scrollHeight + "px"
        }
    }, [text])
    useEffect(() => {
        const a = document.querySelector(".wrapdisk")
        const b = document.querySelector(".disk")
        if (a && b) {
            if (statusoffileinput === "off") {
                a.style.left = "0%"
                b.style.left = "0%"
            } else {
                a.style.left = "-30%"
                b.style.left = "25%"
            }
        }
    }, [statusoffileinput])
    function clickchosefile(e) {
        e.target.children[0]?.click()
        setstatusoffileinput("off")
    }
    function handlefileinput(type) {
        return (e) => {
            if (type === "imagesong") {
                setimagesong(e.target.files[0].name)
                const a = document.querySelector("#wrapdiskuploadthumbnail")
                const b = document.querySelector("#diskuploadthumbnail")
                var fr = new FileReader();
                fr.onload = function () {
                    a.src = fr.result;
                    b.src = fr.result;
                }
                fr.onloadend = () => {
                    setstatusoffileinput("on")
                    b.style.display = "block"
                }
                if (e.target.files.length !== 0) {
                    fr.readAsDataURL(e.target.files[0]);
                }
            } else if (type === "namesong") {
                setsongname(e.target.files[0].name)
                setstatusoffileinput("on")
            } else if (type === "thumbnailsong") {
                setthumbnailsong(e.target.files[0].name)
                const a = document.querySelector(".thumbnailsong")
                var fr = new FileReader();
                fr.onload = function () {
                    a.src = fr.result;
                }
                fr.onloadend = () => {
                    a.style.display = "block"
                    setstatusoffileinput("on")
                }
                if (e.target.files.length !== 0) {
                    fr.readAsDataURL(e.target.files[0]);
                }
            }
        }
    }

    return (
        <form className="popupthemmoi" onClick={closepopupuploadfile}>
            <div className="popupcontentuploadfile">
                <div className="contentitem">
                    <div className="headeritemcontent">
                        <div className="wrapavatar_nameandtime">
                            <div className="avatar">
                                <img src={`${baseimage}/avatar/${user.avatar}`} />
                            </div>
                            <div className="nameandtime">
                                <div className="name">{user.userName}</div>
                            </div>
                        </div>
                        <button type="reset" className="more" id="closepopupuploadfile">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="optionupload">
                        <div onClick={changetypeupload} className="normalsong" style={{ backgroundColor: backgrounduploadtype === "normal" ? "#afafaf63" : "transparent" }}>
                            Quyền người dùng
                        </div>
                        <div onClick={changetypeupload} className="specialsong" style={{ backgroundColor: backgrounduploadtype === "special" ? "#afafaf63" : "transparent" }}>
                            Quyền tác giả
                        </div>
                    </div>
                    <div className="maincontent">
                        <div className="content">
                            <div className="wrapdisk">
                                <img id="wrapdiskuploadthumbnail" className={""} src="http://localhost:4000/orther/music_128x128.png" />
                            </div>
                            <div className="disk" style={{ left: "0%", animationPlayState: 'paused' }}>
                                <img id="diskuploadthumbnail" className={""} src="" style={{ display: "none" }} />
                            </div>
                        </div>
                        <img className="thumbnailsong" src="" style={{ display: "none" }} />
                    </div>

                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputnamesong"
                                ref={heightofinputcomment}
                                onInput={(e) => { setsongname(e.target.value) }}
                                placeholder="name song"
                                value={songname}
                            />
                            <div className="btnsetfile" onClick={clickchosefile}>
                                chose file
                                <input id="filesong" type="file" onInput={handlefileinput("namesong")} />
                            </div>
                        </div>
                    </div>
                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputimagesong"
                                ref={heightofinputcomment}
                                onInput={(e) => { setimagesong(e.target.value) }}
                                placeholder="image song"
                                value={imagesong}
                            />
                            <div className="btnsetfile" onClick={clickchosefile}>
                                chose file
                                <input id="imagesong" type="file" onInput={handlefileinput("imagesong")} />
                            </div>
                        </div>
                    </div>
                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputthumbnailsong"
                                ref={heightofinputcomment}
                                onInput={(e) => { setthumbnailsong(e.target.value) }}
                                placeholder="thumbnail song"
                                value={thumbnailsong}
                            />
                            <div className="btnsetfile" onClick={clickchosefile}>
                                chose file
                                <input id="thumbnailsong" type="file" onInput={handlefileinput("thumbnailsong")} />
                            </div>
                        </div>
                    </div>
                    <div className="detailinfor">
                        <div className="wrapinfor">
                            <textarea
                                name="inputauther"
                                ref={heightofinputcomment}
                                onInput={(e) => { setauthername(e.target.value) }}
                                placeholder="tac gia"
                                value={authername}
                            />
                        </div>
                    </div>
                    <div className="btmpuload">
                        <span onClick={uploadfile}> Thêm mới </span>
                    </div>
                </div>
            </div>
        </form>
    )
}


export default Form_uploadsong