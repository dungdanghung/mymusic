import "./signup.scss"
import { useState } from "react"
import { register } from "../../fetch/user"
import { useNavigate } from "react-router-dom"

function Signup() {
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [username, setusername] = useState('')
    const [emailorphone, setemailorphone] = useState('')
    const [password, setpassword] = useState('')
    const [gender, setgender] = useState('male')
    const [birth, setbirth] = useState('')
    const navigate = useNavigate()

    function HandleRegister(e) {
        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            emailorphone: emailorphone,
            gender: gender,
            birth: birth,
            password: password
        }
        let check = true
        Object.keys(data).forEach((item) => {
            if (!data[item] || data[item].trim() === "") {
                check = false
            }
            if (item === "emailorphone") {
                const a = Array.from(data[item]).every((item) => {
                    if (parseInt(item) || parseInt(item) === 0) return true
                    else return false
                })
                if (!a && !data[item].includes("@gmail.com")) {
                    check = false
                    console.log(0)
                }
                if (a && (data[item].length < 10 || data[item].length > 11)) {
                    check = false
                }
            }
            if (item === "password") {
                const a = Array.from(data[item]).every((item) => {
                    if (parseInt(item)) return true
                    else return false
                })
                if (!a || data[item].length < 8) {
                    check = false
                }
            }
        })
        if (check) {
            register(data)
                .then((rs) => {
                    if (rs) {
                        navigate('/')
                    }
                })
        } else {
            console.log('err')
        }
    }

    return (
        <div className="signup">
            <div className="container">
                <div className="text">
                    Signup Form
                </div>
                <div className="wrap-container">
                    <div className="data">
                        <label>First Name</label>
                        <input type="text" value={firstname} required onChange={(e) => { setfirstname(e.target.value) }} />
                    </div>
                    <div className="data">
                        <label>Last Name</label>
                        <input type="text" value={lastname} required onChange={(e) => { setlastname(e.target.value) }} />
                    </div>
                    <div className="data">
                        <label>UserName</label>
                        <input type="text" value={username} required onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <div className="data">
                        <label>Birth</label>
                        <input type="date" required onChange={(e) => { setbirth(e.target.value) }} />
                    </div>
                    <div className="data gender">
                        <label>Gender</label>
                        <div className="wrap-gender">
                            <div className="gender-item">
                                <span>Male</span>
                                <input name="gender" type="radio" defaultChecked={true} onClick={(e) => { setgender("male") }} />
                            </div>
                            <div className="gender-item">
                                <span>Female</span>
                                <input name="gender" type="radio" onClick={(e) => { setgender("female") }} />
                            </div>
                        </div>
                    </div>
                    <div className="data">
                        <label>Email or Phone</label>
                        <input type="text" value={emailorphone} required onChange={(e) => { setemailorphone(e.target.value) }} />
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
                        <button onClick={HandleRegister} >sign up</button>
                    </div>
                    <div className="signup-link">
                        Not a member? <a href="#">Login now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Signup