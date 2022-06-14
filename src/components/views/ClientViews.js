import { Outlet, Route, Routes } from "react-router-dom"
import { DiveSiteList } from "../diveSites/DiveSiteList"
import { DiveRequestForm } from "../requests/DiveRequestForm"
import { RequestEdit } from "../requests/RequestEdit"
import { RequestList } from "../requests/RequestList"

// component for what will display for clients

export const ClientViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>// App name goes here??// </h1>
					<div>//?? putting stuff here?? // </div>

					<Outlet />
				</>
			}>

				<Route path="sites" element={ <DiveSiteList /> } />
				<Route path="requests/create" element={ <DiveRequestForm /> } />
				<Route path="requests" element={ <RequestList /> } />
				<Route path="requests/:requestId/edit" element={ <RequestEdit /> } />
                                

			</Route>
		</Routes>
	)
}