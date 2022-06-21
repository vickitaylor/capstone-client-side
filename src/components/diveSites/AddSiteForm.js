import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveSites } from "../ApiManager"


export const AddSiteForm = () => {

    const [site, addSite] = useState({
        name: "",
        price: "",
        depth: "",
        description: "", 
        url: ""
    })

    const navigate = useNavigate()

    const saveButtonClick = (event) => {
        event.preventDefault()

        saveSites(site)
            .then(() => {
                navigate("/sites")
            })
    }

    return (
        <form className="siteForm">
            <h2 className="siteForm__title">🦈 Woohoo!! Found A New Dive Site.  Let's add it to the List!🦈</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Site Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Add Site Name"
                        value={site.name}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.name = event.target.value
                                addSite(copy)
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
                        placeholder="Add Trip Price"
                        value={site.price}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.price = parseFloat(event.target.value)
                                addSite(copy)
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
                        placeholder="Add Max Depth"
                        value={site.depth}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.depth = parseInt(event.target.value)
                                addSite(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Add Site Description"
                        value={site.description}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.description = event.target.value
                                addSite(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Photo URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Add URL for photo"
                        value={site.url}
                        onChange={
                            (event) => {
                                const copy = { ...site }
                                copy.url = event.target.value
                                addSite(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button onClick={(clickEvent) => saveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add New Site!!
            </button>

            <button onClick={() => navigate("/sites")}
                className="btn btn-primary">
                Cancel
            </button>

        </form>
    )

}