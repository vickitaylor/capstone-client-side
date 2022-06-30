import { useEffect, useState } from "react"
import { getGuides, saveAssigned, getAssigns } from "../ApiManager"
import { useNavigate, useParams } from "react-router-dom"


export const RequestAssign = () => {
    const { assignId } = useParams()

    const [guides, setGuides] = useState([])
    const [request, setRequest] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getGuides()
            .then(setGuides)
    },
        []
    )

    useEffect(() => {
        getAssigns(assignId)
            .then(setRequest) 
    },
        [assignId]
    )


    const saveButtonClick = (event) => {
        event.preventDefault()

        const assignedToApi = {
            guideId: request.guideId,
            diveRequestId: request.id,
        }

        saveAssigned(assignedToApi)
            .then(() => {
                navigate("/requests")
            })
    }

    return (
        <>

            <section className="assign">
            <h2>Assign a Guide</h2>
                <header>Client Name: {request?.user?.name}</header>
                <div>Location: {request?.diveSite?.name}</div>
                <div>Date: {new Date(request.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div>
                <div>Certification up to {request.certification} feet.</div>

                <form className="requestForm__assign">
                    <fieldset className="fieldset-req">
                        <div className="form-group">
                            <label className="label" htmlFor="guide">Guide Name:</label>
                            <select className="select" id="site" required autoFocus
                                onChange={(event) => {
                                    const copy = { ...request }
                                    copy.guideId = parseInt(event.target.value)
                                    setRequest(copy)
                                }}>
                                <option value="0">Choose Guide:</option>
                                {guides.map(guide => {
                                    return <option value={guide.id} key={`guide--${guide.id}`}>{guide?.user?.name}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>

                </form>
                <button onClick={(event) => saveButtonClick(event)}
                    className="btn__requests">
                    Assign Dive
                </button>

            </section>

        </>



    )

}


