import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEditRequests, getSites, saveRequestEdit } from "../ApiManager"

export const RequestEdit = () => {
    const { requestId } = useParams()

    const [request, updateRequest] = useState({
        diveSiteId: "",
        date: "",
        certification: "",
    })

    const [sites, setSites] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getEditRequests(requestId)
                .then(updateRequest)
        },
        [requestId]
    )

    useEffect(() => {
        getSites()
            .then(setSites)
    },
        []
    )


    const saveButtonClick = (event) => {
        event.preventDefault()

        saveRequestEdit(requestId, request)
            .then(() => {
                navigate("/requests")
            })
    }


    return (
        <>
            <section className="requestForm-all">
                <form className="requestForm">
                    <fieldset>
                        <h2 className="requestForm__title">🤿🐙🦑🦈 Need to change?? 🦈🐡🐠🐟</h2>
                        <div className="form-group">
                            <label className="label-req" htmlFor="site">Site Name:</label>
                            <select className="select" value={request.diveSiteId} id="site" required autoFocus
                                onChange={(event) => {
                                    const copy = { ...request }
                                    copy.diveSiteId = parseInt(event.target.value)
                                    updateRequest(copy)
                                }}>
                                <option value="0">Choose Site:</option>
                                {sites.map(site => {
                                    return <option value={site.id} key={`site--${site.id}`}>{site.name}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label className="label-req" htmlFor="date">Date:</label>
                            <input type="date"
                                required autoFocus
                                className="form-control"
                                placeholder="Pick a date"
                                value={request.date}
                                onChange={
                                    (event) => {
                                        const copy = { ...request }
                                        copy.date = event.target.value
                                        updateRequest(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label className="label-req" htmlFor="comments">Comments: </label>
                            <textarea
                                required autoFocus
                                type="text"
                                style={{
                                    height: "10rem"
                                }}
                                className="form-control"
                                placeholder="Comments for change"
                                value={request.comments}
                                onChange={
                                    (event) => {
                                        const copy = { ...request }
                                        copy.comments = event.target.value
                                        updateRequest(copy)
                                    }
                                }>{request.comments}</textarea>
                        </div>
                    </fieldset> 

                    <button onClick={(clickEvent) => saveButtonClick(clickEvent)}
                        className="btn">
                        Make Changes
                    </button>

                </form >
            </section>
        </>
    )
}



