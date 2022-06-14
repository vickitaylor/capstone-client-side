import { useNavigate } from "react-router-dom"
import { deleteRequest } from "../ApiManager"


export const Request = ({ requestObj, getAllRequests, currentUser }) => {


    const navigate = useNavigate()

    const deleteButton = () => {
        return <button onClick={() => {
            deleteRequest(requestObj)
                .then(() => {
                    getAllRequests()
                })
        }}
            className="request__delete">Delete</button>
    }



    return (
        <>
            {
                currentUser.staff

                    ?


                    <section className="request" key={`request--${requestObj.id}`}>
                        <header className="request__header">{requestObj?.user?.name}</header>
                        <div>Location: {requestObj?.diveSite?.name}</div>
                        <div>Date: {new Date(requestObj.date).toLocaleDateString()}</div>
                        <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                        <div> Change Comments: {requestObj.comments}</div>

                        <button onClick={() => navigate("/requests/assign")}>Assign Request</button>
                        {
                            deleteButton()
                        }
                    </section>

                    :

                    <section className="request" key={`request--${requestObj.id}`}>
                        <header className="request__header">Location: {requestObj?.diveSite?.name}</header>
                        <div>Date: {new Date(requestObj.date).toLocaleDateString()}</div>
                        <div>Price: {requestObj?.diveSite?.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>

                        <button onClick={() => navigate(`/requests/${requestObj.id}/edit`)}>Edit</button>
                        {
                            deleteButton()
                        }
                    </section>


            }


        </>

    )
}

