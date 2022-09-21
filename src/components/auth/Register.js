import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        name: "",
        isStaff: false, 
        skillLevelId: 1
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("https://shark-bait-api.herokuapp.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("charter_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`https://shark-bait-api.herokuapp.com/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal needspace">Register for Shark Bait Charters</h1>
                <fieldset>
                    <label className="label--login" htmlFor="name"> Full Name </label>
                    <input onChange={updateCustomer}
                           type="text" id="name" className="form-control logon"
                           placeholder="Enter your first and last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label className="label--login" htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control logon"
                        placeholder="Email address" required />
                </fieldset>
                    <button type="submit"> Register </button>
                    <button className="cancel-btn" onClick={() => navigate("/login")}>
                Cancel
            </button>
                </fieldset>
            </form>
        </main>
    )
}

