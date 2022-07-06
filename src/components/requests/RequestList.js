import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getRequests, getGuides, getLevels } from "../ApiManager"
import { Request } from "./Request"
import "./Request.css"


export const RequestList = ({ searchTermsState }) => {

    const [requests, setRequests] = useState([])
    const [filteredRequests, setFiltered] = useState([])
    const [guides, setGuides] = useState([])
    const [completed, setNotComplete] = useState(true)
    const [levels, setLevels] = useState([])
    const navigate = useNavigate()

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)


    // guides array is completely populated before the requests come back
    useEffect(() => {
        getGuides()
            .then((guides) => {
                setGuides(guides)
                getRequests()
                    .then(setRequests)
                getLevels()
                    .then(setLevels)
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
        if (completed === false) {
            const openRequests = requests.filter(request => request.completed === false)
            setFiltered(openRequests)
        } else {
            setFiltered(requests)
        }
    },
        [completed]
    )

    useEffect(() => {
        const searchedRequests = requests.filter(request => {
            return (
                request?.user?.name.toLowerCase().includes(searchTermsState.toLowerCase()) ||
                request?.diveSite?.name.toLowerCase().includes(searchTermsState.toLowerCase()) ||
                request.date.toLowerCase().includes(searchTermsState.toLowerCase())
            )
        })
        setFiltered(searchedRequests)
    },
        [searchTermsState]
    )



    return (
        <>
            {
                charterUserObject.staff
                    ? <>
                        <h2>Dive Requests</h2>
                        <button className="btn_test btn-bubble" onClick={() => navigate("/mine")}>Show Mine</button>
                        <button className="btn_test btn-bubble" onClick={() => setNotComplete(true)}>Show All</button>
                        <button className="btn_test btn-bubble" onClick={() => setNotComplete(false)}>Dives Not Completed</button>
                    </>
                    : <h2>My Dive Requests</h2>
            }

            <article className="requests">
                {
                    filteredRequests.map((request) => <Request key={`request--${request.id}`}
                        requestObj={request}
                        getAllRequests={getAllRequests}
                        currentUser={charterUserObject}
                        guides={guides}
                        levels={levels}
                    />
                    )
                }
            </article>

        </>

    )
}


