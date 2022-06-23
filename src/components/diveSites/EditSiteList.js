import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEditSites, saveSiteEdit } from "../ApiManager"

export const EditSiteList = () => {
    const { siteId } = useParams()

    const [site, updateSite] = useState({
        name: "",
        price: "",
        depth: "",
        description: "",
        url: ""
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            getEditSites(siteId)
                .then(updateSite)
        },
        [siteId]
    )

    const saveButtonClick = (event) => {
        event.preventDefault()

        saveSiteEdit(siteId, site)
            .then(() => {
                navigate("/sites")
            })
    }


    return (
        <form className="requestForm">
            <h2 className="requestForm__title">Need to change??🤿🐙🦑🦈🐡🐠🐟</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Site Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={site.name}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.name = event.target.value
                                updateSite(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number"
                        required autoFocus
                        min="45.00" step="0.01"
                        className="form-control"
                        value={site.price}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.price = parseFloat(event.target.value,2)
                                updateSite(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="depth">Depth:</label>
                    <input type="number"
                        required autoFocus
                        min="0.00" step="1" max="130"
                        className="form-control"
                        value={site.depth}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.depth = parseInt(event.target.value)
                                updateSite(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        style={{
                            height: "10rem"
                        }}
                        className="form-control"
                        value={site.description}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.description = event.target.value
                                updateSite(copy)
                            }
                        }> </textarea>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Photo URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={site.url}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.url = event.target.value
                                updateSite(copy)
                            }
                        } />
                </div>
            </fieldset>


            <button onClick={(clickEvent) => saveButtonClick(clickEvent)}
                className="btn">
                Make Changes
            </button>

            <button onClick={() => navigate("/sites")}
                className="btn">
                Cancel
            </button>

        </form >
    )
}



