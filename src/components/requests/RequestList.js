import { useState, useEffect } from "react"
import { getRequests, getGuides } from "../ApiManager"
import { Request } from "./Request"
import "./Request.css"

export const RequestList = () => {

    const [requests, setRequests] = useState([])
    const [filteredRequests, setFiltered] = useState([])
    const [guides, setGuides] = useState([])

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)

    useEffect(() => {

        // guides array is completely populated before the requests come back
        getGuides()
            .then((guides) => {
                setGuides(guides)
                getRequests()
                    .then(setRequests)
            })
    },
        []
    )

    // function to rerender the list
    const getAllRequests = () => {
        getRequests()
            .then(setRequests)
    }


    useEffect(() => {
        if (charterUserObject.staff) {
            setFiltered(requests)
        } else {
            const myRequests = requests.filter(request => request.userId === charterUserObject.id)
            setFiltered(myRequests)
        }
    },
        [requests]
    )



    return (
        <>
            <h2>Dive Requests</h2>

            <article className="requests">
                {
                    filteredRequests.map((request) => <Request key={`request--${request.id}`}
                        getAllRequests={getAllRequests}
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


