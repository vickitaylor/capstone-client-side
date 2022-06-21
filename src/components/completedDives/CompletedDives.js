import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCompletedDives } from "../ApiManager"
import "./completed.css"

// open to b and have button for a and b. 
// a is mine, b is every user completed


export const CompletedDives = () => {

    const [dives, setDives] = useState([])
    const [filteredDives, setFiltered] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCompletedDives()
            .then(setDives)
    },
        []
    )

    // useEffect(() => {
    //     if( mine) {
    // setFiltered(mine)
    // } else {
    //  setFiltered(dives)
    // }
    // },
    //     [dives]
    // )

    return (

        <>
            <button onClick={() => navigate("/completed/mine")}>Show Mine</button>
            <button onClick={() => navigate("/completed")}>Show All</button>
            
            <h2>Completed Dives</h2>


            <article className="completed">
                {
                    dives.map(dive => {
                        return <section className="complete" key={`complete--${dive.id}`}>
                            <header>{dive.diveSite.name}</header>
                            <div>{dive.user.name}</div>
                            <div>Comments: </div>
                        </section>
                    })
                }
            </article>

        </>

        //     <>
        //     {
        //         charterUserObject.staff

        //             ? <button onClick={() => navigate("/sites/create")}>Add Site</button>
        //             : ""

        //     }

        //     <h2>Where we Dive!!</h2>

        //     <article className="divesites">
        //         {
        //             sites.map(site => {
        //                 return <section className="site" key={`site--${site.id}`}>
        //                     <header className="site__header">{site.name}</header>
        //                     <div>Depth: {site.depth}</div>
        //                     <div>Price: {site.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
        //                     <div>{site.description}</div>
        //                 </section>
        //             })
        //         }
        //     </article>
        // </>
    )

}