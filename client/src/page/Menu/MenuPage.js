import "./MenuPage.scss"
import logo from "../../data/img/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { AnimationClosePage } from "../../component/AnimationChangePage/AnimationChangePage"

function MenuPage() {
    const navigate = useNavigate();

    function optionclick(e) {
        e.preventDefault()
        const x = e.pageX
        const y = e.pageY
        AnimationClosePage(x, y, handlechangepage, e.target.pathname)
    }
    function handlechangepage(link) {
        navigate(link);
    }

    return (
        <div className="wrappage">
            <div className="content">
                <div className="logo">
                    <img src={logo} />
                </div>

                <div className="menuoption">
                    <div className="row1">
                        <Link to={'/music'} className="option1" onClick={optionclick}> Music </Link>
                        <Link to={'/profile'} className="option2" onClick={optionclick}> User </Link>
                    </div>
                    <div className="row2">
                        <div className="option3" onClick={optionclick}> Nhat Ky </div>
                        <div className="option4"> Top </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default MenuPage