import { Outlet, Route, Routes } from "react-router-dom"
import { CompletedDives } from "../completedDives/CompletedDives"
import { SiteContainer } from "../diveSites/SiteContainer"
import { Home } from "../home/Home"
import { DiveRequestForm } from "../requests/DiveRequestForm"
import { RequestEdit } from "../requests/RequestEdit"
import { RequestList } from "../requests/RequestList"
import { CompletedComments } from "../completedDives/CompletedComments"

// component for what will display for clients

export const ClientViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>


					<Outlet />
				</>
			}>

				<Route path="sites" element={<SiteContainer />} />
				<Route path="requests/create" element={<DiveRequestForm />} />
				<Route path="requests" element={<RequestList />} />
				<Route path="requests/:requestId/edit" element={<RequestEdit />} />
				<Route path="completed" element={<CompletedDives />} />
				<Route path="home" element={<Home />} />
				<Route path="completed/:completedId" element={<CompletedComments />} />

			</Route>
		</Routes>
	)
}
