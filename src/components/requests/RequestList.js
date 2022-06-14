import { useState, useEffect } from "react"
import { getRequests } from "../ApiManager"
import { Request } from "./Request"

import "./Request.css"

export const RequestList = () => {

    const [requests, setRequests] = useState([])
    const [filteredRequests, setFiltered] = useState([])

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)

    useEffect(() => {
        getRequests()
            .then(setRequests)
    },
        []
    )

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
                    />
                    )
                }
            </article>

        </>

    )
}


