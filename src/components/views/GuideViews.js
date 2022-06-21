import { Outlet, Route, Routes } from "react-router-dom"
import { AssignedToMe } from "../assigned/AssignedToMe"
import { AddSiteForm } from "../diveSites/AddSiteForm"
import { DiveSiteList } from "../diveSites/DiveSiteList"
import { RequestAssign } from "../requests/RequestAssign"
import { RequestList } from "../requests/RequestList"


// component for what will display for guides.
export const GuideViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Shark Bait Charters</h1>
					<div>Everyone loves Shark Bait!</div>

					<Outlet />
				</>
			}>

				<Route path="sites" element={< DiveSiteList />} />
				<Route path="sites/create" element={< AddSiteForm />} />
                <Route path="requests" element={ <RequestList /> } />
                <Route path="requests/:assignId/assign" element={ <RequestAssign /> } />
                <Route path="mine" element={ <AssignedToMe /> } />

			</Route>
		</Routes>
	)
}
