import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { saveRequestEdit, getEditRequests } from "../ApiManager"

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export const CompletedComments = () => {
    const { completedId } = useParams()
    const navigate = useNavigate()

    const [complete, setComplete] = useState({
        userId: 0,
        diveSiteId: 0,
        date: "",
        certification: 0,
        comments: "",
        completed: true,
        completedComments: "",
        rating: 0
    })

    useEffect(() => {
        getEditRequests(completedId)
            .then(setComplete)
    },
        [completedId]
    )

    const saveButtonClick = (event) => {
        event.preventDefault()

        saveRequestEdit(completedId, complete)
            .then(() => {
                navigate("/completed")
            })
    }



    return (
        <>
            <section className="requestForm-all">
                <form className="requestForm">
                    <h2 className="requestForm__title">🦑 How was your Dive? 🦑</h2>
                    <fieldset className="fieldset-req">
                        <div className="form-group">
                            <label className="label-req" htmlFor="comments">Review Comments:</label>
                            <textarea
                                required autoFocus
                                type="text"
                                style={{
                                    height: "5rem"
                                }}
                                className="form-control"
                                placeholder="Review Comments"
                                value={complete.completedComments}
                                onChange={
                                    (event) => {
                                        const copy = { ...complete }
                                        copy.completedComments = event.target.value
                                        setComplete(copy)
                                    }
                                }></textarea>
                        </div>
                    </fieldset>
                    <fieldset className="fieldset-req">
                        <div style={{ display: 'block' }}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <label className="label-req" htmlFor="rating">Rate your Dive:</label><br />
                                <Rating
                                    name="Rating Label"
                                    value={complete.rating}
                                    onChange={
                                        (event) => {
                                            const copy = { ...complete }
                                            copy.rating = parseInt(event.target.value)
                                            setComplete(copy)
                                        }}
                                />
                            </Box>
                        </div>
                    </fieldset>

                    <button onClick={(clickEvent) => saveButtonClick(clickEvent)}
                        className="btn-rf">
                        Make Changes
                    </button>
                    <button onClick={() => navigate("/completed")}
                        className="btn-rf">
                        Cancel
                    </button>

                </form>
            </section>
        </>
    )
}

