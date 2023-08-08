import { useEffect, useState, useRef } from "react"
import "./ContentHomePage.scss"
import { GetThumbnailSongHot } from "../../../fetch/song"
import { baseimage } from "../../../fetch/index"
import PackageSlice from "@danghung_dung/slice_item2"
import Header from "../../Layout/header/header"

function ContentHomePage() {
    const [thumbnailhotsong, setthumbnailhotsong] = useState([])
    const slicehotthumbnailsong = useRef()


    useEffect(() => {
        GetThumbnailSongHot(7)
            .then((rs) => {
                setthumbnailhotsong(rs)
            })
            .then(() => {
                setTimeout(() => {
                    if (slicehotthumbnailsong.current.children.length > 0) {
                        PackageSlice(slicehotthumbnailsong.current, 3, 5, 0.7, 'ease')
                    }
                }, 0)
            })
    }, [])

    return (
        <div className="content">
            <Header />
            <div className="slicesonghot">
                <div ref={slicehotthumbnailsong} className="wrapslicesonghot">
                    {
                        thumbnailhotsong.map((item) => {
                            return (
                                <div key={item.songID} className="sliceitem">
                                    <div className="wrapsliceitem">
                                        <div className="wrapthumbnailsliceimg">
                                            <img src={`${baseimage}thumbnailsong-1280x780/${item.thumbnail}`}></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default ContentHomePage