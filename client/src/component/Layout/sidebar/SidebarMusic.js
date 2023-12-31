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
            <div className="sidebar_logo">
                <Link to={"/"} className="wrap-logo">
                    <img className="logo" src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"></img>
                </Link>

            </div>
            <div className="sidebar__persional">
                <ul className="sidebar__list">
                    <Link to={'/'} className={`sidebar__item ${checkactiveitem === '/' ? 'sidebar__item--active' : ''}`}>
                        <FontAwesomeIcon icon={faCirclePlay} />
                        Cá Nhân
                    </Link>
                    <Link to={'/khampha'} className={`sidebar__item ${checkactiveitem === '/khampha' ? 'sidebar__item--active' : ''}`}>
                        <FontAwesomeIcon icon={faCompactDisc} />
                        Khám Phá
                    </Link>
                    <Link to={'/zingchart'} className={`sidebar__item ${checkactiveitem === '/zingchart' ? 'sidebar__item--active' : ''}`}>
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                        #zingchart
                    </Link>
                    <Link to={'/radio'} className={`sidebar__item sidebar__item-radio js__toast  ${checkactiveitem === '/radio' ? 'sidebar__item--active' : ''} `}>
                        <FontAwesomeIcon icon={faRadio} />
                        Radio
                        <span>Live</span>
                    </Link>
                    <Link to={'/follow'} className={`sidebar__item js__toast  ${checkactiveitem === '/follow' ? 'sidebar__item--active' : ''}`}>
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
                        <Link to={"/vip"} className="js__toast">Nâng cấp VIP</Link>
                    </div>
                    <div className="sidebar__library-bot">
                        <div className="sidebar__library-bot-heading">
                            Thư viện
                        </div>
                        <ul className="sidebar__list">
                            <li className="sidebar__item">
                                <Link to={"songupload"}>
                                    <FontAwesomeIcon icon={faMusic} />
                                    Bài hát
                                </Link>
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