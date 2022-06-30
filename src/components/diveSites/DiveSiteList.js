import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSites } from "../ApiManager"
import "./DiveSites.css"


export const DiveSiteList = ({ siteSearchState}) => {

    const [sites, setSites] = useState([])
    const [filteredSites, setFiltered] = useState([])

    const navigate = useNavigate()

    const localCharterUser = localStorage.getItem("charter_user")
    const charterUserObject = JSON.parse(localCharterUser)

    useEffect(() => {
        getSites()
            .then(setSites)
    },
        []
    )

    useEffect(() => {
        setFiltered(sites)
    },
        [sites]
    )

    useEffect(() => {
        const searchedSites = sites.filter(site => {
            return (
                site.name.toLowerCase().includes(siteSearchState) ||
                site.funFacts.toLowerCase().includes(siteSearchState.toLowerCase()) ||
                site.willSee.toLowerCase().includes(siteSearchState.toLowerCase()) ||
                site.description.toLowerCase().includes(siteSearchState)
            )
        })
        setFiltered(searchedSites)
    },
        [siteSearchState]
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
                    filteredSites.map(site => {
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
                                        <div>Fun Facts: {site.funFacts}</div><br />
                                        <div>Typically Can See: {site.willSee}</div>
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
