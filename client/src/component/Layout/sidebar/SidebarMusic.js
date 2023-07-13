import "./SidebarMusic.scss"
import { faCirclePlay, faCompactDisc, faArrowTrendUp, faRadio, faRectangleList, faMusic, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import dung_React_scrollbar from "../scroll/index"



function SidebarMusic() {

    const [checkactiveitem, setcheckactiveitem] = useState("/")
    useEffect(() => {
        setcheckactiveitem(window.location.pathname)
        const a = document.querySelector(".sidebar__library")
        dung_React_scrollbar(a)
    }, [])

    return (
        <div className="sidebare">
            <div className="sidebar__persional">
                <ul className="sidebar__list">
                    <Link to={'/music'} className={`sidebar__item ${checkactiveitem === '/music' ? 'sidebar__item--active' : ''}`}>
                        <FontAwesomeIcon icon={faCirclePlay} />
                        Cá Nhân
                    </Link>
                    <Link to={'/music/khampha'} className={`sidebar__item ${checkactiveitem === '/music/khampha' ? 'sidebar__item--active' : ''}`}>
                        <FontAwesomeIcon icon={faCompactDisc} />
                        Khám Phá
                    </Link>
                    <Link to={'/music/zingchart'} className={`sidebar__item ${checkactiveitem === '/music/zingchart' ? 'sidebar__item--active' : ''}`}>
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                        #zingchart
                    </Link>
                    <Link to={'/music/radio'} className={`sidebar__item sidebar__item-radio js__toast  ${checkactiveitem === '/music/radio' ? 'sidebar__item--active' : ''} `}>
                        <FontAwesomeIcon icon={faRadio} />
                        Radio
                        <span>Live</span>
                    </Link>
                    <Link to={'/music/follow'} className={`sidebar__item js__toast  ${checkactiveitem === '/music/follow' ? 'sidebar__item--active' : ''}`}>
                        <FontAwesomeIcon icon={faRectangleList} />
                        Theo Dõi
                    </Link>
                </ul>
            </div>
            <div className="distance"></div>

            <div className="sidebar__library">
                <div className="wrap__sidebar__library">
                    <div className="sidebar__library-top">
                        <ul className="sidebar__list">
                            <li className="sidebar__item">
                                <FontAwesomeIcon icon={faMusic} />
                                Nhạc Mới
                            </li>
                            <li className="sidebar__item">
                                <FontAwesomeIcon icon={faCompactDisc} />
                                Thể Loại
                            </li>
                            <li className="sidebar__item">
                                <FontAwesomeIcon icon={faArrowTrendUp} />
                                Top 100
                            </li>
                            <li className="sidebar__item js__toast">
                                <FontAwesomeIcon icon={faRectangleList} />
                                MV
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar__library-center">
                        <span className="sidebar__library-center-vip-heading">Nghe nhạc không quảng cáo cùng kho nhạc VIP</span>
                        <span className="sidebar__library-center-vip-body js__toast">Nâng cấp VIP</span>
                    </div>
                    <div className="sidebar__library-bot">
                        <div className="sidebar__library-bot-heading">
                            Thư viện
                        </div>
                        <ul className="sidebar__list">
                            <li className="sidebar__item">
                                <FontAwesomeIcon icon={faMusic} />
                                Bài hát
                            </li>
                            <li className="sidebar__item">
                                <FontAwesomeIcon icon={faCompactDisc} />
                                Playlist
                            </li>
                            <li className="sidebar__item js__toast">
                                <FontAwesomeIcon icon={faClock} />
                                Gần đây
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SidebarMusic