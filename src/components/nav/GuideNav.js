import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const GuideNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <img className="navbar__logo" src="images/piclogo.png" alt="logo"/>
            
            <li className="navbar__item">
                <Link className="navbar__link" to="/sites">Dive Site Locations</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/requests">Requests</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/mine">Assigned To Me</Link>
            </li>

            {
                localStorage.getItem("charter_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("charter_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
