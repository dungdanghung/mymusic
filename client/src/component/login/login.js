import { useState } from "react"
import "./login.scss"
import { login, getuser } from "../../fetch/user"
import { USER_ACTION, useUserData } from "../../context/userContext"

function Login() {
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [, dispatchUser] = useUserData()

    function handlecancelogin(e) {
        if (e.target.className === "login") {
            e.target.style.display = "none"
        }
    }

    function onorofflogin(e) {
        const a = document.querySelector(".login")
        if (a.style.display === "block") {
            a.style.display = "none"
        } else {
            a.style.display = "flex"
        }
    }

    function HandleLogin(e) {
        const data = {
            username: userName,
            password: password
        }
        login(data)
            .then((rs) => {
                if (rs) {
                    window.localStorage.setItem('token', JSON.stringify(rs))
                    let token = window.localStorage.getItem('token')
                    token = JSON.parse(token)
                    getuser(token.accessToken)
                        .then((rs) => {
                            if (rs) {
                                dispatchUser({ type: USER_ACTION.SET, payload: rs })
                            }
                        })
                }
            })
    }
    return (
        <>
            <div className="btnsignin" onClick={onorofflogin}>
                <div>
                    Sign in
                </div>
            </div>
            <div className="login" onClick={handlecancelogin}>
                <div className="container">
                    <div className="text">
                        Login Form
                    </div>
                    <div className="wrap-container">
                        <div className="data">
                            <label>UserName</label>
                            <input type="text" value={userName} required onChange={(e) => { setuserName(e.target.value) }} />
                        </div>
                        <div className="data">
                            <label>Password</label>
                            <input type="password" value={password} required onChange={(e) => { setpassword(e.target.value) }} />
                        </div>
                        <div className="forgot-pass">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <div className="btn">
                            <div className="inner"></div>
                            <button onClick={HandleLogin} >login</button>
                        </div>
                        <div className="signup-link">
                            Not a member? <a href="#">sign in now</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login