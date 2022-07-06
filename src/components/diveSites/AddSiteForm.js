import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveSites } from "../ApiManager"


export const AddSiteForm = () => {

    const [site, addSite] = useState({
        name: "",
        price: "",
        depth: "",
        description: "",
        url: "",
        funFacts: "",
        willSee: ""
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
        <section className="requestForm-all">

            <form className="siteForm">
                <h2 className="siteForm__title">🦈 Woohoo!! Found A New Dive Site! Let's add it to the List!🦈</h2>
                <fieldset>
                    <div className="form-group">
                        <label className="label" htmlFor="name">Site Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-site"
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
                        <label className="label" htmlFor="price">Price:</label>
                        <input type="number"
                            required 
                            min="100.00" step="1.00"
                            className="form-control-site"
                            placeholder="Add Trip Price"
                            value={site.price}
                            onChange={
                                (event) => {
                                    const copy = { ...site }
                                    copy.price = parseFloat(event.target.value, 2)
                                    addSite(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="label" htmlFor="depth">Depth:</label>
                        <input type="number"
                            required 
                            min="0.00" step="1" max="130"
                            className="form-control-site"
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
                        <label className="label" htmlFor="description">Description:</label>
                        <textarea
                            required 
                            type="text"
                            style={{
                                height: "5rem"
                            }}
                            className="form-control-site"
                            placeholder="Add Site Description"
                            value={site.description}
                            onChange={
                                (event) => {
                                    const copy = { ...site }
                                    copy.description = event.target.value
                                    addSite(copy)
                                }
                            }> </textarea>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="label" htmlFor="funFacts">Fun Facts:</label>
                        <textarea
                            required 
                            type="text"
                            style={{
                                height: "5rem"
                            }}
                            className="form-control-site"
                            placeholder="Add some fun facts about site"
                            value={site.funFacts}
                            onChange={
                                (event) => {
                                    const copy = { ...site }
                                    copy.funFacts = event.target.value
                                    addSite(copy)
                                }
                            }> </textarea>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="label" htmlFor="willSee">Typically Will See:</label>
                        <textarea
                            required 
                            type="text"
                            style={{
                                height: "5rem"
                            }}
                            className="form-control-site"
                            placeholder="Add common fish and coral for the site"
                            value={site.willSee}
                            onChange={
                                (event) => {
                                    const copy = { ...site }
                                    copy.willSee = event.target.value
                                    addSite(copy)
                                }
                            }> </textarea>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label className="label" htmlFor="photo">Photo URL:</label>
                        <input
                            required 
                            type="text"
                            className="form-control-site"
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
                    className="btn-ds">
                    Add New Site
                </button>

                <button onClick={() => navigate("/sites")}
                    className="btn-ds">
                    Cancel
                </button>

            </form>
        </section>
    )

}