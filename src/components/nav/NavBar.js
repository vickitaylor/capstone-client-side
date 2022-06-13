import { GuideNav } from "./GuideNav"
import { ClientNav } from "./ClientNav"
import "./NavBar.css"

export const NavBar = () => {

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)

    if (charterUserObject.staff) {
        return < GuideNav />
    } else {
        return < ClientNav />
    }
}
