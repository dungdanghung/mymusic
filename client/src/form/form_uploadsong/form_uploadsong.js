import "./form_uploadsong.scss"
import { useEffect, useState, useRef } from "react"
import { baseimage } from "../../fetch/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { uploadsong } from "../../fetch/user"
import { useUserData } from "../../context/userContext"

function Form_uploadsong({ closepopup }) {
    const [user] = useUserData()
    const [backgrounduploadtype, setbackgrounduploadtype] = useState("normal")
    const [text, settext] = useState('')
    const [statusoffileinput, setstatusoffileinput] = useState("off")
    const [onoffpopupthumbnail, setonoffpopupthumbnail] = useState("off")
    const [filethumbnal, setfilethumbnal] = useState("")
    const [songname, setsongname] = useState("")
    const [authername, setauthername] = useState("")
    const heightofinputcomment = useRef()

    function handleinputfile() {
        const a = document.querySelector("#fileupload")
        a.click()
        setstatusoffileinput("off")
    }
    function handleaddthumbnail() {
        const a = document.querySelector("#thumbnailfileupload")
        a.click()
    }
    function closepopupuploadfile(e) {
        if (e.target.className === "popupthemmoi" || e.target.className === "more") {
            closepopup()
        }
    }
    function handlefileuploadinput(e) {
        if (e.target.files.length !== 0) {
            setstatusoffileinput("on")
        } else {
            setstatusoffileinput("off")
        }
    }
    function handlethumbnalinput(e) {
        const a = document.querySelector("#wrapdiskuploadthumbnail")
        const b = document.querySelector("#diskuploadthumbnail")
        var fr = new FileReader();
        fr.onload = function () {
            a.src = fr.result;
            b.src = fr.result;
        }
        if (e.target.files.length !== 0) {
            fr.readAsDataURL(e.target.files[0]);
        }
        setfilethumbnal("file")
        setonoffpopupthumbnail("off")
    }
    function uploadfile(e) {
        const file = document.querySelector("#fileupload")
        const image = document.querySelector("#thumbnailfileupload")
        if (file.files[0]) {
            let token = window.localStorage.getItem("token")
            token = JSON.parse(token)
            uploadsong({ song: file.files[0], image: image.files[0] }, songname, authername, token.accessToken)
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
                setonoffpopupthumbnail("off")
            } else {
                a.style.left = "-30%"
                b.style.left = "25%"
                setonoffpopupthumbnail("on")
            }
        }
    }, [statusoffileinput])

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
                        <input name="inputfilesong" id="fileupload" type="file" onInput={handlefileuploadinput} />
                        <div className="content" onClick={handleinputfile}>
                            <div className="wrapdisk">
                                <img id="wrapdiskuploadthumbnail" className={filethumbnal !== "" ? "image" : ""} src="http://localhost:4000/images/orther/music_128x128.png" />
                            </div>
                            <div className="disk" style={{ left: "0%", animationPlayState: 'paused' }}>
                                <img id="diskuploadthumbnail" className={filethumbnal !== "" ? "image" : ""} src="http://localhost:4000/images/orther/music_128x128.png" />
                            </div>
                        </div>
                    </div>
                    <div className="popupaddthumbnail" style={{ display: onoffpopupthumbnail === "off" ? "none" : "flex" }}>
                        <div className="wrappopupaddthumbnail">
                            <div className="btnaction">
                                <input name="inputfileimage" id="thumbnailfileupload" type="file" style={{ display: "none" }} onInput={handlethumbnalinput} />
                                <div className="agree"><span onClick={handleaddthumbnail}>add thumbnail</span></div>
                                <div className="disagree"><span onClick={() => { setonoffpopupthumbnail("off") }}>close</span></div>
                            </div>
                        </div>
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