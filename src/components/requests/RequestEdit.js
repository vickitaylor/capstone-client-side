import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEditRequests, getSites, saveRequestEdit} from "../ApiManager"

// 🦖🦖🦖do i want to be able to change the cert level???, or just date, site, and comments🦩🦩🦩

export const RequestEdit = () => {
    const { requestId } = useParams()

    const [request, updateRequest] = useState({
        diveSiteId: 0,
        date: "",
        certification: 0,
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
        <form className="requestForm">
            <h2 className="requestForm__title">Need to change??🤿🐙🦑🦈🐡🐠🐟</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="site">Site Name:</label>
                    <select id="site" required autoFocus
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
                    <label htmlFor="date">Date:</label>
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

            {/* <fieldset>
                <div className="form-group">
                    <span>Certification Depth:</span>

                    <input required autoFocus type="radio" className="form-control"
                        name="certification" id="60"
                        value={request.certification}
                        onChange={
                            (event) => {
                                const copy = { ...request }
                                copy.certification = parseInt(event.target.id)
                                updateRequest(copy)
                            }} />
                    <label htmlFor="yes">60</label>
                    <input required autoFocus type="radio" className="form-control"
                        name="certification" id="130" value={request.certification} onChange={
                            (event) => {
                                const copy = { ...request }
                                copy.certification = parseInt(event.target.id)
                                updateRequest(copy)
                            }} />
                    <label htmlFor="no">130</label>
                </div>
            </fieldset> */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="comments">Comments: </label>
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
                        }>Reason for change...</textarea>
                </div>
            </fieldset>

            <button onClick={(clickEvent) => saveButtonClick(clickEvent)}
                className="btn btn-primary">
                Make Changes
            </button>

        </form >
    )
}



