import { useEffect, useState } from "react"
import { getGuides, getEditRequests } from "../ApiManager"
import { useNavigate, useParams } from "react-router-dom"


export const RequestAssign = () => {
    const {assignId} = useParams
    const [guides, setGuides] = useState([])
    const [requests, setRequests] = useState([])
    const navigate = useNavigate()
    
    
    useEffect(() => {
        getGuides()
            .then(setGuides)
    },
        []
    )

    useEffect(() => {
        getEditRequests(assignId)
            .then(setRequests)
    },
        [assignId]
    )

    // const saveButtonClick = (event) => {
    //     event.preventDefault()

    //     saveGuideAssign(requests)
    //         .then(() => {
    //             navigate("/requests")
    //         })
    // }

    return (
        <>
            <h2>Assign a Guide</h2>

            <article className="requests_assign">
                {
                    requests.map(request => {
                        return <section className="assign" key={`assign--${request.id}`}>
                            <header className="request__header">{request?.user?.name}</header>
                            <div>Location: {request?.diveSite?.name}</div>
                            <div>Date: {new Date(request.date).toLocaleDateString()}</div>
                                                        
                        </section>
                    })}
            </article>
                    {
                        // saveButtonClick()
                    }
        </>
    )

}