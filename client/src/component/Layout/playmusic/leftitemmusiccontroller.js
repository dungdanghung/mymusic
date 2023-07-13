import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { baseimage } from "../../../fetch/index"

function LeftItemMusicController({ data }) {

  return (
    <>
      <div className="itemuser">
        <div className="thumner">
          <div className={`thumneritem ${data ? "" : "loading"}`}>
            {
              data ?
                <img className='hg' src={`${baseimage}thumbnailsong/${data.image}`}></img> :
                <></>
            }
          </div>
        </div>
        <div className="contenplaymusic">
          <div className='wrapcontenplaymusic'>
            <div className={`titlecontenplaymusic ${data ? "" : "loading"}`}>
              {
                data ?
                  <a href='/'><span className='text_titlecontenplaymusic'>{data.songName}</span></a> :
                  <></>
              }
            </div>
            <div className={`titleitemcontenplaymusic ${data ? "" : "loading"}`}>
              {
                data ?
                  <a href="/" className="titleitemcontenplaymusic_title2">{data.singer}</a> :
                  <></>
              }
            </div>
          </div>
        </div>
        <div className="icenitemuser">
          <div className="tim">
            <button><FontAwesomeIcon className='coler' icon={faHeart} /></button>
          </div>
          <div className="more">
            <button><FontAwesomeIcon className='coler' icon={faEllipsis} /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftItemMusicController