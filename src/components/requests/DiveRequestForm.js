import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getSites, saveRequests } from "../ApiManager"
import "./Request.css"


export const DiveRequestForm = () => {

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)
    const userId = charterUserObject.id

    const [request, addRequest] = useState({
        "userId": userId,
        "diveSiteId": 0,
        "date": "",
        "certification": "",
        "comments": "",
        "completed": false,
        "completedComments": ""
    })

    const [sites, setSites] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSites()
            .then(setSites)
    },
        []
    )

    const saveButtonClick = (event) => {
        event.preventDefault()

        saveRequests(request)
            .then(() => {
                navigate("/requests")
            })
    }



    return (
        <>

            <section className="requestForm-all">
                <form className="requestForm">
                    <h2 className="requestForm__title">🤿🐙🦑🦈 Let's Go Diving! 🦈🐡🐠🐟</h2>
                    <fieldset>
                        <div className="form-group">
                            <label className="label-req" htmlFor="site">Site Name:</label>
                            <select className="select" id="site" required autoFocus
                                onChange={(event) => {
                                    const copy = { ...request }
                                    copy.diveSiteId = parseInt(event.target.value)
                                    addRequest(copy)
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
                            <label className="label-req" htmlFor="date">Date:</label><br />
                            <input type="date"
                                required autoFocus
                                className="form-control"
                                placeholder="Pick a date"
                                value={request.date}
                                onChange={
                                    (event) => {
                                        const copy = { ...request }
                                        copy.date = event.target.value
                                        addRequest(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label className="label-req">Certification Depth:</label><br />

                            <input required autoFocus type="radio" className="req-form-control"
                                name="certification" id="60"
                                value={request.certification}
                                onChange={
                                    (event) => {
                                        const copy = { ...request }
                                        copy.certification = parseInt(event.target.id)
                                        addRequest(copy)
                                    }} />
                            <label className="radioBtn" htmlFor="yes">60</label>
                            <input required autoFocus type="radio" className="req-form-control"
                                name="certification" id="130" value={request.certification} onChange={
                                    (event) => {
                                        const copy = { ...request }
                                        copy.certification = parseInt(event.target.id)
                                        addRequest(copy)
                                    }} />
                            <label htmlFor="no">130</label>
                        </div>
                    </fieldset>

                    <button onClick={(clickEvent) => saveButtonClick(clickEvent)}
                        className="btn-rf">
                        Request Dive
                    </button>

                    <button onClick={() => navigate("/requests")}
                        className="btn-rf">
                        Cancel
                    </button>

                </form>
            </section>
        </>
    )
}