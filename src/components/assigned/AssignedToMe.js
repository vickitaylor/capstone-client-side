import { useState, useEffect } from "react"
import { getRequests, getGuides, getClients, getLevels } from "../ApiManager"
import { Link, useNavigate } from "react-router-dom"
import { Assigned } from "./Assigned"
import "./Assigned.css"

export const AssignedToMe = () => {

    const [requests, setRequests] = useState([])
    const [guides, setGuides] = useState([])
    const [clients, setClients] = useState([])
    const [levels, setLevels] = useState([])

    const navigate = useNavigate()

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)

    useEffect(() => {
        getGuides()
            .then((guides) => {
                setGuides(guides)
                getRequests()
                    .then(setRequests)
            })
    },
        []
    )

    useEffect(() => {
        getClients()
            .then(setClients)
        getLevels()
            .then(setLevels)
    },
        []
    )



    return (
        <>

            <h2>Dives Assigned To Me</h2>
            <button onClick={() => navigate("/requests")}>Show All</button>

            <article className="all-assigned">
                <aside className="clientList">
                    <header className="assigned__header">Client List</header>
                    {
                        clients.map((client) => {
                            return <ul className="client_list" key={`client--${client.id}`}>
                                <Link className="client_list_name" to={`/clients/${client.id}`}>
                                    <li className="client_names">{client.name}</li>
                                </Link>
                            </ul>
                        })
                    }
                </aside>
                <section className="assigned_list">
                    {
                        requests.map((request) => <Assigned key={`request--${request.id}`}
                            requestObj={request}
                            currentUser={charterUserObject}
                            guides={guides}
                            levels={levels}
                        />
                        )
                    }
                </section>

            </article>
        </>
    )
}










