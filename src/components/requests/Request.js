import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteRequest, saveCompletedRequest, saveAssigned } from "../ApiManager"


export const Request = ({ requestObj, getAllRequests, currentUser, guides, levels}) => {

    const [assignedGuide, setAssignedGuide] = useState({})
    const [userGuide, setUserGuide] = useState({})
    const [clientLevel, setClientLevel] = useState([])
    const [request, setRequest] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            if (guides.length) {
                let assignedGuide = null
                if (requestObj.assignedDives.length > 0) {
                    const reqGuideRel = requestObj.assignedDives[0]
                    assignedGuide = guides.find(guide => guide.id === reqGuideRel.guideId)
                    setAssignedGuide(assignedGuide)
                }
                const userGuide = guides.find(guide => guide.userId === currentUser.id)
                setUserGuide(userGuide)
            }

        },
        [guides, currentUser, requestObj]
    )


    useEffect(() => {
        if (requestObj.id !== "" && levels.length) {
            const skillType = levels.find(level => level.id === requestObj?.user?.skillLevelId)
            setClientLevel(skillType)
        }
    },
        [levels, requestObj]
    )


    const deleteButton = () => {
        return <button onClick={() => {
            deleteRequest(requestObj)
                .then(() => {
                    getAllRequests()
                })
        }}
            className="btn__requests">Delete</button>
    }

    const completeRequest = () => {
        if (userGuide.id === assignedGuide.id && requestObj.completed === false) {
            return <button className="btn__requests"
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
            completed: true,
            completedComments: requestObj.completedComments
        }

        saveCompletedRequest(requestObj, reqComplete)
            .then(getAllRequests)
    }

    const saveButtonClick = (event) => {
        event.preventDefault()

        const assignedToApi = {
            guideId: request.guideId,
            diveRequestId: requestObj.id,
        }

        saveAssigned(assignedToApi)
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
                        <div>Level: {clientLevel.skill}</div>
                        <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                        <div>
                            {
                                requestObj.comments !== ""
                                    ? `Change Comments: ${requestObj.comments}`
                                    : <br />
                            }
                        </div>

                        <div className="request__guide">
                            {
                                requestObj.assignedDives.length
                                    ? `Assigned To: ${assignedGuide !== null ? assignedGuide?.user?.name : ""}`
                                    : <>
                                        <select className="select_list" id="site" required
                                            onChange={(event) => {
                                                event.preventDefault()
                                                const copy = { ...request }
                                                copy.guideId = parseInt(event.target.value)
                                                setRequest(copy)
                                            }}>
                                            <option value="0">Choose Guide:</option>
                                            {guides.map(guide => {
                                                return <option value={guide.id} key={`guide--${guide.id}`}>{guide?.user?.name}</option>
                                            })}
                                        </select>
                                        <button onClick={(event) => saveButtonClick(event)}
                                            className="btn__requests">
                                            Assign Dive
                                        </button>
                                    </>
                            }
                        </div>
                        <div>
                            {
                                requestObj.completed !== true
                                    ? deleteButton()
                                    : `🐠Dive Completed`
                            }
                            {
                                completeRequest()
                            }
                        </div>

                    </section>

                    :
                    <section className="request client" key={`request--${requestObj.id}`}>
                        <header className="request__header">{requestObj?.diveSite?.name}</header>
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
                                    ? `🤿Dive Completed`
                                    : <>
                                        <button className="btn__requests" onClick={() => navigate(`/requests/${requestObj.id}/edit`)}>Edit</button>
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

