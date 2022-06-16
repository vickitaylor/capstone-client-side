import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteRequest, saveCompletedRequest } from "../ApiManager"


export const Request = ({ requestObj, getAllRequests, currentUser, guides }) => {

    const navigate = useNavigate()
    const [assignedGuide, setAssignedGuide] = useState({})
    const [userGuide, setUserGuide] = useState({})

    useEffect(
        () => {
            if (guides.length) {
                let assignedGuide = null
                if (requestObj.assignedDives.length > 0) {
                    const reqEmpRel = requestObj.assignedDives[0]
                    assignedGuide = guides.find(guide => guide.id === reqEmpRel.guideId)
                    setAssignedGuide(assignedGuide)
                }
                const userGuide = guides.find(guide => guide.userId === currentUser.id)
                setUserGuide(userGuide)
            }

        },
        [guides, currentUser, requestObj]
    )


    const deleteButton = () => {
        return <button onClick={() => {
            deleteRequest(requestObj)
                .then(() => {
                    getAllRequests()
                })
        }}
            className="request__delete">Delete</button>
    }

    const completeRequest = () => {
        if (userGuide.id === assignedGuide.id && requestObj.completed === false) {
            return <button className="btn__finish"
                onClick={closeRequest}
            >Dive Completed</button>
        } else {
            return ""
        }
    }


    const closeRequest = () => {
        const reqComplete = {
            userId: requestObj.userId,
            diveSiteId: requestObj.diveSiteId,
            date: requestObj.date,
            certification: requestObj.certification,
            comments: requestObj.comments,
            completed: true
        }

        saveCompletedRequest(requestObj, reqComplete)
            .then(getAllRequests)
    }

    return (
        <>
            {
                currentUser.staff

                    ?
                    <section className="request" key={`request--${requestObj.id}`}>
                        <header className="request__header">{requestObj?.user?.name}</header>
                        <div>Location: {requestObj?.diveSite?.name}</div>
                        <div>Date: {new Date(requestObj.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div>
                        <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                        <div>
                            {
                                requestObj.comments !== ""
                                    ? `Change Comments: ${requestObj.comments}`
                                    : ""
                            }
                        </div>

                        <div className="request__guide">
                            {
                                requestObj.assignedDives.length
                                    ? `Assigned To: ${assignedGuide !== null ? assignedGuide?.user?.name : ""}`
                                    : <button className="btn" onClick={() => navigate(`/requests/${requestObj.id}/assign`)}>Assign Request</button>
                            }
                        </div>

                        {
                            deleteButton()
                        }


                        {
                            completeRequest()
                        }

                    </section>

                    :
                    <section className="request" key={`request--${requestObj.id}`}>
                        <header className="request__header">Location: {requestObj?.diveSite?.name}</header>
                        <div>Date: {new Date(requestObj.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div>
                        <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                        <div className="request__guide">
                            {
                                requestObj.assignedDives.length
                                    ? `Assigned To: ${assignedGuide !== null ? assignedGuide?.user?.name : ""}`
                                    : "Dive has not yet been assigned to a guide."
                            }
                        </div>

                        <div className="request__completed">
                            {
                                requestObj.completed
                                    ? `Dive Completed`
                                    : <>
                                        <button className="btn" onClick={() => navigate(`/requests/${requestObj.id}/edit`)}>Edit</button>
                                        {
                                            deleteButton()
                                        }
                                    </>
                            }
                        </div>
                    </section>
            }
        </>
    )
}

