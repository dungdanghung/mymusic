import "./MusicFollowPage.scss"
import "../MusicPageBase.scss"
import Header from "../../../component/Layout/header/header"
import SidebarMusic from "../../../component/Layout/sidebar/SidebarMusic"
// import Playmusic from "../../../component/Layout/playmusic/playmusic"

function MusicFollowPage() {
    return (
        <div className="musicpage">
            <Header />
            <div className="wrapcontentmusicpage">
                <SidebarMusic />
                <div className="content">
                    <h1>follow page</h1>
                </div>
                <div className="listmusic"></div>
            </div>
            {/* <Playmusic /> */}
        </div>
    )
}

export default MusicFollowPage