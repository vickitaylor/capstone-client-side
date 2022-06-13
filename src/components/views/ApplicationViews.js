import { GuideViews } from "./GuideViews"
import { ClientViews } from "./ClientViews"


// if statement for if the customer or the employee view will show, depending on who is logged in
export const ApplicationViews = () => {

	const localCharterUser = localStorage.getItem("charter_user")
	const charterUserObject = JSON.parse(localCharterUser)

	if (charterUserObject.staff) {
		// return employee view
		return < GuideViews />
	} else {
		// return customer view
		return <ClientViews />
	}
	
}
