import { Outlet, Route, Routes } from "react-router-dom"
import { CompletedDives } from "../completedDives/CompletedDives"
import { DiveSiteList } from "../diveSites/DiveSiteList"
import { Home } from "../home/Home"
import { DiveRequestForm } from "../requests/DiveRequestForm"
import { RequestEdit } from "../requests/RequestEdit"
import { RequestList } from "../requests/RequestList"

// component for what will display for clients

export const ClientViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Shark Bait Dive Charters </h1>
					<div>Come dive with us!</div>

					<Outlet />
				</>
			}>

				<Route path="sites" element={ <DiveSiteList /> } />
				<Route path="requests/create" element={ <DiveRequestForm /> } />
				<Route path="requests" element={ <RequestList /> } />
				<Route path="requests/:requestId/edit" element={ <RequestEdit /> } />
				<Route path="completed" element={ <CompletedDives />} />
				<Route path="home" element={ <Home />} />
				
			</Route>
		</Routes>
	)
}