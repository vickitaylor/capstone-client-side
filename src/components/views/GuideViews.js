import { Outlet, Route, Routes } from "react-router-dom"
import { AssignedToMe } from "../assigned/AssignedToMe"
import { AddSiteForm } from "../diveSites/AddSiteForm"
import { DiveSiteList } from "../diveSites/DiveSiteList"
import { EditSiteList } from "../diveSites/EditSiteList"
import { RequestContainer } from "../requests/RequestContainer"
import { ClientDetails } from "../assigned/ClientDetails"


// component for what will display for guides.
export const GuideViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					{/* <h1>Shark Bait Dive Charters</h1>
					<div>Everyone loves diving with Shark Bait!</div> */}

					<Outlet />

				</>
			}>

				<Route path="sites" element={< DiveSiteList />} />
				<Route path="sites/create" element={< AddSiteForm />} />
				<Route path="requests" element={<RequestContainer />} />
				<Route path="mine" element={<AssignedToMe />} />
				<Route path="sites/:siteId/edit" element={<EditSiteList />} />
				<Route path="/clients/:clientId" element={<ClientDetails />} />
			</Route>
		</Routes>
	)
}
