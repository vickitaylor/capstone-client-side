import { useEffect, useState } from "react"
import { getUsers } from "../ApiManager"
import ImageFadeIn from "react-image-fade-in";
import "./home.css"

/*
Welcome page for clients 
*/


export const Home = () => {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrent] = useState({})


    useEffect(() => {
        getUsers()
            .then(setUsers)
    },
        []
    )

    useEffect(() => {
        if (users.length) {
            const localCharterUser = localStorage.getItem("charter_user")
            const charterUserObject = JSON.parse(localCharterUser)
            const userNameObj = users.find(user => user.id === charterUserObject.id)
            setCurrent(userNameObj)
        }
    },
        [users]
    )


    return (
            <>
            <h1 className="welcome">Welcome Back {currentUser.name}!</h1>
        <article className="home__page" >
            
            <ImageFadeIn src="images/logo.png" alt="logo" className="logo" opacityTransition={4} />

        </article>
            </>

    )
}