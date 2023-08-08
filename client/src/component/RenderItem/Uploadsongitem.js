import "./Uploadsongitem.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { faHeart as tets } from "@fortawesome/free-regular-svg-icons"

function Uploadsongitem({ data }) {
    return (
        <div className="uploadsongitem">
            <div className="detail">
                <div className="image">
                    <img src="" />
                </div>
                <div className="nameofsinger">
                    <div className="name">name of song</div>
                    <div className="singer">singer</div>
                </div>
            </div>
            <div className="actionsongupload">
                <div className="actionitem">
                    <div className="wrapactionitem">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
                <div className="actionitem">
                    <div className="wrapactionitem">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Uploadsongitem