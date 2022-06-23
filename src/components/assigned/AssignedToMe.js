import { useState, useEffect } from "react"
import { getRequests, getGuides } from "../ApiManager"
import { useNavigate } from "react-router-dom"
import { Assigned } from "./Assigned"
import "./Assigned.css"

export const AssignedToMe = () => {

    const [requests, setRequests] = useState([])
    const [guides, setGuides] = useState([])

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

    return (
        <>

            <h2>Dives Assigned To Me</h2>
            <button onClick={() => navigate("/requests")}>Show All</button>

            <article className="all-assigned">
                {
                    requests.map((request) => <Assigned key={`request--${request.id}`}
                        requestObj={request}
                        currentUser={charterUserObject}
                        guides={guides}
                    />
                    )
                }
            </article>
        </>

    )

}










