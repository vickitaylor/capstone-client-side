import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
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

                    ? <button className="btn" onClick={() => navigate("/sites/create")}>Add Site</button>
                    : ""

            }

            <h2>Where we Dive!!</h2>

            <article className="divesites">
                {
                    sites.map(site => {
                        return <section className="site" key={`site--${site.id}`}>
                            {
                                charterUserObject.staff
                                    ? <header className="site__header">
                                        <Link to={`/sites/${site.id}/edit`}>{site.name}</Link>
                                    </header>
                                    : <header className="site__header">{site.name}</header>
                            }

                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img className="photos" src={site.url} alt={site.name} />
                                    </div>
                                    <div className="flip-card-back">
                                        <br />
                                        <div>Depth: {site.depth} feet</div><br />
                                        <div>Price for 2 Dives on Site: {site.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div><br />
                                        <div>{site.description}</div><br />
                                        <div>Fun Facts: </div><br />
                                        <div>Typically Can See: </div>
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
