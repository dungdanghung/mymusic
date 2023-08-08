import "./ContentUploadPage.scss"
import Header from "../../Layout/header/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import Uploadsongitem from "../../RenderItem/Uploadsongitem"

function ContentUploadPage() {
    const [listsongupload, setlistsongupload] = useState([])

    return (
        <div className="contentuploadsong">
            <Header />
            <div className="titlepage">
                <div className="texttitle">
                    <h1>Thư Viện Tải Lên</h1>
                </div>
                <div className="iconplay">
                    <FontAwesomeIcon icon={faCirclePlay} />
                </div>
            </div>
            <div className="distance">
                <div className="type">TẢI LÊN</div>
                <span />
            </div>
            <div className="listsongupload">
                {
                    listsongupload.length === 0 ?
                        <></> :
                        listsongupload.map((item) => {
                            return (
                                <div key={item.songID}>
                                    <Uploadsongitem />
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}


export default ContentUploadPage