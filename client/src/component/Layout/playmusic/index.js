import "./musiccontroller.scss"
import LeftItemMusicController from "./leftitemmusiccontroller"
import MainItemMusicController from "./mainitemmusiccontroller"
import RightItemMusicController from "./rightitemmusiccontroller"
import { useSongData, SONG_ACTION } from "../../../context/songContext"

function MusicController() {
    const [song] = useSongData()
    return (
        <div className="musiccontroller">
            <LeftItemMusicController data={song} />
            <MainItemMusicController data={song} />
            <RightItemMusicController />
        </div>
    )
}

export default MusicController