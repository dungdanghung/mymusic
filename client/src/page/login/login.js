import "./login.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, getuser } from "../../fetch/user"
import { useUserData, USER_ACTION } from "../../context/userContext"

function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [, dispatchUser] = useUserData()
    const navigate = useNavigate()

    function HandleLogin() {
        const data = {
            // username: userName,
            username: username,
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
                                navigate('/')
                            }
                        })
                }
            })
    }

    return (
        <div className="login">
            <div className="container">
                <div className="text">
                    Login Form
                </div>
                <div className="wrap-container">
                    <div className="data">
                        <label>UserName</label>
                        <input type="text" value={username} required onChange={(e) => { setusername(e.target.value) }} />
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
                        <button onClick={HandleLogin} >Login</button>
                    </div>
                    <div className="signup-link">
                        Not a member? <a href="#">sign up now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login