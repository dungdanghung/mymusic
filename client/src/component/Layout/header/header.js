import "./header.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import Login from "../../login/login"
import { USER_ACTION, useUserData } from "../../../context/userContext"
import { baseimage } from "../../../fetch/index"
import { uploadsong } from "../../../fetch/user"

function Header() {
    const [user, dispatchUser] = useUserData()


    function handlelogout(e) {
        window.localStorage.removeItem("token")
        dispatchUser({ type: USER_ACTION.REMOVE })
    }
    async function handleuploadsong(e) {
        const a = document.querySelector("#test")
        await uploadsong(a.files[0])
    }

    return (
        <div className="header">
            <div className="wrap-header">
                <div className="header-item1">
                    <Link to={"/"} className="wrap-logo">
                        <img className="logo" src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"></img>
                    </Link>

                </div>
                <div className="header-item2">
                    <div className="wrap-search">
                        <div className="icon-search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <input type="text" />
                    </div>
                </div>
                <div className="header-item3">


                    <div className="header-item3-item">
                        <div className="setting">
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                    {
                        user ? <div className="header-item3-item">
                            <div className="user">
                                <img src={`${baseimage}avatar/${user.avatar}`} />
                                <div className="popupuser">
                                    <div className="popupuser-itemuser">
                                        <div className="wrapicon">
                                            <img src={`${baseimage}avatar/${user.avatar}`} />
                                        </div>
                                        <div className="popupcontentuser">
                                            <div className="wrappopupcontentuser">
                                                <div className="username">{user.firstName + user.lastName}</div>
                                                <div className="typeuser">{user.roleName}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="popupuser-itemuser">
                                        <div className="vipbtn">
                                            Nâng cấp tài khoản
                                        </div>
                                    </div>
                                    <div className="popupuser-itemuser">
                                        <label className="title">Cá nhân</label>
                                    </div>
                                    <div className="popupuser-itemuser">
                                        <Link to={"/profile"} className="profile">
                                            <FontAwesomeIcon icon={faUser} />
                                            <span>Hồ sơ</span>
                                        </Link>
                                    </div>
                                    <div className="popupuser-itemuser">
                                        <div className="upload">
                                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                            <span>Tải lên</span>
                                        </div>
                                    </div>
                                    <div className="popupuser-itemuser">
                                        <div className="logout" onClick={handlelogout}>
                                            Đăng xuất
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            :
                            <>
                                <Login />
                                <Link to={"/signup"} className="header-item3-item-signup">
                                    <div>
                                        Sign up
                                    </div>
                                </Link>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}


export default Header