import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getSites } from "../ApiManager"
import "./DiveSites.css"


export const DiveSiteList = () => {

    const [sites, setSites] = useState([])
    const navigate = useNavigate()

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)

    useEffect(() => {
        getSites()
            .then(setSites)
    },
        []
    )

    return (
        <>
            {
                charterUserObject.staff

                    ? <button onClick={() => navigate("/sites/create")}>Add Site</button>
                    : ""

            }

            <h2>Where we Dive!!</h2>

            <article className="divesites">
                {
                    sites.map(site => {
                        return <section className="site" key={`site--${site.id}`}>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img className="photos" src={site.url} alt={site.name} />
                                    </div>
                                    <div className="flip-card-back">
                                        <header className="site__header">{site.name}</header>
                                        <div>Depth: {site.depth}</div>
                                        <div>Price: {site.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                                        <div>{site.description}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    })
                }
            </article>
        </>
    )
} 
