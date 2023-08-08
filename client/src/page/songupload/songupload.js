import "./songupload.scss"
import SidebarMusic from "../../component/Layout/sidebar/SidebarMusic"
import MusicController from "../../component/Layout/playmusic"
import ContentUploadPage from "../../component/ContentPage/ContentUploadPage/ContentUploadPage"

function SongUpload() {
    return (
        <div className="uploadsongpage">
            <div className="wrapcontentuploadpage">
                <SidebarMusic />
                <ContentUploadPage />
            </div>
            <MusicController />
        </div>
    )
}


export default SongUpload