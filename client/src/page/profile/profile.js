import { useEffect, useState } from "react"
import "./profile.scss"
import { getuser } from "../../fetch/user"
import { baseimage } from "../../fetch/index"
import { useUserData, USER_ACTION } from "../../context/userContext"
import Header from "../../component/Layout/header/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faCameraRotate, faPlus, faPen, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Profile_Item from "../../component/RenderItem/ProfileItem"
import Form_uploadsong from "../../form/form_uploadsong/form_uploadsong"

function Profile() {
    const [user, dispatchUser] = useUserData()
    const [datacontent, setdatacontent] = useState([])
    const [popupuploadsong, setpopupuploadsong] = useState("off")

    function popupfileupload() {
        setpopupuploadsong("on")
    }
    function closepopupfileupload() {
        setpopupuploadsong("off")
    }

    useEffect(() => {
        if (!user) {
            let token = window.localStorage.getItem('token')
            token = JSON.parse(token)
            getuser(token.accessToken)
                .then((rs) => {
                    if (rs) {
                        dispatchUser({ type: USER_ACTION.SET, payload: rs })
                    }
                })
        }
    }, [])

    if (user) {
        return (
            <div className="profilepage">
                <div className="wrapprofile">
                    <Header type="full" />
                    <div className="contentuser">
                        <div className="wrapcontentuser">
                            <div className="backgroundavatar">
                                <img />
                                <div className="wrapbtnfuntion">
                                    <div className="btnfuntion">
                                        <span>Tạo Mới Avatar</span>
                                        <FontAwesomeIcon icon={faCircleUser} />
                                    </div>
                                    <div className="btnfuntion">
                                        <span>Chỉnh Sửa Ảnh Bìa</span>
                                        <FontAwesomeIcon icon={faCameraRotate} />
                                    </div>
                                </div>
                            </div>
                            <div className="user">
                                <div className="avatar">
                                    <img src={`${baseimage}/avatar/${user.avatar}`} />
                                </div>
                                <div className="detail">
                                    <div className="username">
                                        {user.userName}
                                    </div>
                                    <div className="follow">
                                        <div className="followitem">
                                            0 Follower
                                        </div>
                                        <span />
                                        <div className="followitem">
                                            0 Đang Theo Dõi
                                        </div>
                                    </div>
                                </div>
                                <div className="functionofuser">
                                    <div className="wrapbtnfunction">
                                        <div className="updateinfor">
                                            <span>Chỉnh Sửa Trang Cá Nhân</span>
                                            <FontAwesomeIcon icon={faPen} />
                                        </div>
                                        <div className="addnew" onClick={popupfileupload}>
                                            <span>Thêm Mới</span>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </div>
                                    <div className="btnsuggetfollew">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            popupuploadsong === "off" ?
                                <></> :
                                <Form_uploadsong closepopup={closepopupfileupload} />
                        }



                    </div>
                    <div className="profilecontent">
                        <div className="wrapcontent">
                            <div className="sidebarcontent">
                                <div className="introduce">
                                    <label>Giới thiệu</label>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                                <div className="music">
                                    <label>Nhạc</label>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                                <div className="frend">
                                    <label>Bạn bè</label>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </div>
                            <div className="containcontent">
                                {
                                    datacontent.length !== 0 ?
                                        <div>content</div>
                                        :
                                        <></>
                                }
                                <Profile_Item data={user} itembirthday={true} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}



export default Profile