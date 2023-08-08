import Header from "../../../component/Layout/header/header";
import "./MusicPage.scss"
import "../MusicPageBase.scss"
import MusicController from "../../../component/Layout/playmusic";
import SidebarMusic from "../../../component/Layout/sidebar/SidebarMusic";
import ListNextSong from "../../../component/Layout/listnextsong";
import ContentHomePage from "../../../component/ContentPage/ContentHomPage/ContentHomePage";

function MusicPage() {


    return (
        <div className="musicpage">
            {/* <Header /> */}
            <div className="wrapcontentmusicpage">
                <SidebarMusic />
                <ContentHomePage />
                <ListNextSong />
            </div>
            <MusicController />
        </div>
    )
}


export default MusicPage