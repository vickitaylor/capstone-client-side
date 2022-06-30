import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClient, saveUserEdit, getLevels } from "../ApiManager"

export const ClientDetails = () => {
    const { clientId } = useParams()
    const navigate = useNavigate()
    const [levels, setLevel] = useState([])
    // const [client, setClient] = useState({})

    const [user, updateUser] = useState({
        name: "",
        email: "",
        isStaff: false,
        skillLevelId: 0
    })


    useEffect(() => {
        getClient(clientId)
            .then(updateUser)
    },
        [clientId]
    )

    // useEffect(() => {
    //     if (user.name !== "") {
    //         setClient(user)
    //     }
    //     console.log(client.skillLevelId)
    // },
    //     [user]
    // )


    useEffect(() => {
        getLevels()
            .then(setLevel)
    },
        []
    )

    const saveButtonClick = (event) => {
        event.preventDefault()

        saveUserEdit(clientId, user)
            .then(() => {
                navigate("/mine")
            })
    }

    // const levelName = levels.find(level => level.id === user.skillLevelId)

    return (
        <>
            <section className="client_detail">

                <h2>Client Details</h2>

                <header>{user.name}</header>
                {/* <div>Current Skill Level: {user.skillLevelId}</div> */}
                {/* <div>Trips With Us: {user?.diveRequests.length}</div> */}


                <form className="client_detail_form">
                    <fieldset className="fieldset-req">
                        <label className="label" htmlFor="level">Change Level To:</label>

                        {levels.map(level => {
                            return (
                                <div className="req-form-control" key={`level--${level.id}`}>
                                    <input
                                        required autoFocus
                                        onChange={(event) => {
                                            const copy = { ...user }
                                            copy.skillLevelId = parseInt(event.target.value)
                                            updateUser(copy)
                                        }}
                                        type="radio"
                                        name="skillLevel"
                                        value={level.id}
                                    />
                                    {level.skill}
                                </div>
                            )
                        })}
                    </fieldset>

                    <button onClick={(clickEvent) => saveButtonClick(clickEvent)}
                        className="btn">
                        Make Changes
                    </button>

                    <button onClick={() => navigate("/mine")}
                        className="btn">
                        Cancel
                    </button>

                </form>


            </section>
        </>
    )
}
