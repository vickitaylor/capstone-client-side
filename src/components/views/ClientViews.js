import { Outlet, Route, Routes } from "react-router-dom"
import { DiveSiteList } from "../diveSites/DiveSiteList"
import { DiveRequestForm } from "../requests/DiveRequestForm"

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
				<Route path="request" element={ <DiveRequestForm /> } />
                
			</Route>
		</Routes>
	)
}