import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClient, saveUserEdit, getLevels, getClientDetails } from "../ApiManager"

export const ClientDetails = () => {
    const { clientId } = useParams()

    const [client, updateClient] = useState({
        name: "",
        email: "",
        isStaff: false,
        skillLevelId: 0
    })

    const navigate = useNavigate()
    const [levels, setLevel] = useState([])
    const [clientDetail, setClientDetail] = useState({})
    const [clientLevel, setClientLevel] = useState([])


    useEffect(() => {
        getClient(clientId)
            .then(updateClient)
    },
        [clientId]
    )


    useEffect(() => {
        getLevels()
            .then(setLevel)
    },
        []
    )


    useEffect(() => {
        getClientDetails(clientId)
            .then(setClientDetail)
    },
        [clientId]
    )

    useEffect(() => {
        if (client.name !== "" && levels.length) {
            const skillType = levels.find(level => level.id === client.skillLevelId)
            setClientLevel(skillType)
        }
    },
        [client, levels]
    )

    const saveButtonClick = (event) => {
        event.preventDefault()

        saveUserEdit(clientId, client)
            .then(() => {
                navigate("/mine")
            })
    }


    return (
        <>
            <section className="client_detail">
                <div className="detail_inner">
                    <header className="assigned__header">🤿 Update Client Skill Level 🤿</header>
                    <br />
                    <header className="assigned__header">{client.name}</header>
                    <div>Current Skill Level: {clientLevel.skill}</div>
                    {
                        clientDetail.diveRequests
                            ? `Trips With Us: ${clientDetail.diveRequests.length}`
                            : ""
                    }
                    <br />
                    <form className="client_detail_form">
                        <fieldset className="fieldset-req">
                            <label className="label" htmlFor="level">Change Level To:</label>

                            {levels.map(level => {
                                return (
                                    <div className="req-form-control" key={`level--${level.id}`}>
                                        <input
                                            required autoFocus
                                            onChange={(event) => {
                                                const copy = { ...client }
                                                copy.skillLevelId = parseInt(event.target.value)
                                                updateClient(copy)
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

                </div>
            </section>
        </>
    )
}
