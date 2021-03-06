import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("tuna@turner.com")
    const navigate = useNavigate()

    
    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("charter_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    })) 
                    
                    const localCharterUser = localStorage.getItem("charter_user")
                    const charterUserObject = JSON.parse(localCharterUser)
                    {
                        charterUserObject.staff
                  
                        ? navigate("/requests")
                        : navigate("/home")
                    }
                       
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="needspace">Shark Bait Charters</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label className="label-login" htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control logon"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    ) 
}

