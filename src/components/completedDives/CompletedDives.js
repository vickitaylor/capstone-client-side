import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCompletedDives } from "../ApiManager"
import "./completed.css"

export const CompletedDives = () => {

    const [dives, setDives] = useState([])
    const [filteredDives, setFiltered] = useState([])
    const [mine, setMine] = useState(false)
    const navigate = useNavigate()

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)

    useEffect(() => {
        getCompletedDives()
            .then(setDives)
    },
        []
    )

    useEffect(() => {
        setFiltered(dives)
    },
        [dives]
    )

    useEffect(() => {
        if (mine === true) {
            const mine = (dives.filter(dive => dive.userId === charterUserObject.id))
            setFiltered(mine)
        } else {
            setFiltered(dives)
        }
    },
        [mine]
    )

    return (

        <>
            <h2>Completed Dives</h2>
            <button className="btn" onClick={() => setMine(true)}>Show Mine</button>
            <button className="btn" onClick={() => setMine(false)}>Show All</button>


            <article className="completed">
                {
                    filteredDives.map(dive => {
                        return <section className="complete" key={`complete--${dive.id}`}>

                            <header className="complete__header">{dive.diveSite.name}</header>
                            <div>{dive.user.name}</div>
                            <div>Dive Date: {new Date(dive.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div>
                            <div>Dive Rating: {dive.rating}</div>
                            <div>{dive.completedComments}</div>

                        {
                           mine 
                            ? <button className="btn"onClick={() => navigate(`/completed/${dive.id}`)}>Edit</button>
                            : ""
                        }
                        </section>
                    })
                }
            </article>

        </>

    )

}