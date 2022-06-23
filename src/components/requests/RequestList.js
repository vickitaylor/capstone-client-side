import { useState, useEffect } from "react"
import { getRequests, getGuides } from "../ApiManager"
import { Request } from "./Request"
import "./Request.css"

export const RequestList = () => {

    const [requests, setRequests] = useState([])
    const [filteredRequests, setFiltered] = useState([])
    const [guides, setGuides] = useState([])
    const [completed, setNotComplete] = useState(true)

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

        useEffect(() => {
        if(completed === false) {
            const openRequests = requests.filter(request => request.completed === false ) 
            setFiltered(openRequests)
        } else {
            setFiltered(requests)
        } 
    },
    [completed]
    )
 
    return (
        <>
            {
                charterUserObject.staff
                ? <>
                <h2>Dive Requests</h2>
                <button className="btn" onClick={() => setNotComplete(true)}>Show All</button>
                <button className="btn" onClick={() => setNotComplete(false)}>Show Dives Not Completed</button>
                </>
                : <h2>My Dive Requests</h2>
            }

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


