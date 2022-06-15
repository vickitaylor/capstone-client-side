import { Outlet, Route, Routes } from "react-router-dom"
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
					<h1>// App name goes here?? //</h1>
					<div>//?? putting stuff here?? // </div>

					<Outlet />
				</>
			}>

				<Route path="sites" element={< DiveSiteList />} />
				<Route path="sites/create" element={< AddSiteForm />} />
                <Route path="requests" element={ <RequestList /> } />
                <Route path="requests/:assignId/assign" element={ <RequestAssign /> } />
			</Route>
		</Routes>
	)
}
