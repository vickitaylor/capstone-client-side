import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteRequest } from "../ApiManager"


export const Request = ({ requestObj, getAllRequests, currentUser, guides }) => {

    const navigate = useNavigate()

    const deleteButton = () => {
        return <button onClick={() => {
            deleteRequest(requestObj)
                .then(() => {
                    getAllRequests()
                })
        }}
            className="request__delete">Delete</button>
    }

    let assignedGuide = null
    if (requestObj.assignedDives.length >0) {
        const reqEmpRel = requestObj.assignedDives[0]
        assignedGuide = guides.find(guide => guide.id === reqEmpRel.guideId)
    }
    
    return (
        <>
            {
                currentUser.staff

                    ?


                    <section className="request" key={`request--${requestObj.id}`}>
                        <header className="request__header">{requestObj?.user?.name}</header>
                        <div>Location: {requestObj?.diveSite?.name}</div>
                        <div>Date: {new Date(requestObj.date).toLocaleDateString()}</div>
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

                        <div className="btn">
                            {
                                deleteButton()
                            }
                        </div>

                    </section>

                    :

                    <section className="request" key={`request--${requestObj.id}`}>
                        <header className="request__header">Location: {requestObj?.diveSite?.name}</header>
                        <div>Date: {new Date(requestObj.date).toLocaleDateString()}</div>
                        <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                        <div className="request__guide">
                            {
                                requestObj.assignedDives.length
                                    ? `Assigned To: ${assignedGuide !== null ? assignedGuide?.user?.name : ""}`
                                    : ""
                            }
                        </div>

                        <button className="btn" onClick={() => navigate(`/requests/${requestObj.id}/edit`)}>Edit</button>
                        {
                            deleteButton()
                        }
                    </section>


            }


        </>

    )
}

