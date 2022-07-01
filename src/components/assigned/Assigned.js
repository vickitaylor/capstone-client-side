import { useState, useEffect } from "react"

export const Assigned = ({ requestObj, currentUser, guides, levels }) => {

    const [userGuide, setUserGuide] = useState({})
    const [assignedGuide, setAssignedGuide] = useState({})
    const [skillLevel, setClientLevel] = useState([])


    useEffect(
        () => {

            if (requestObj.assignedDives.length > 0) {
                let assignedGuide = null
                const reqGuideRel = requestObj.assignedDives[0]
                assignedGuide = guides.find(guide => guide.id === reqGuideRel.guideId)
                setAssignedGuide(assignedGuide)
            }
            const userGuide = guides.find(guide => guide.userId === currentUser.id)
            setUserGuide(userGuide)

        },
        [guides, currentUser, requestObj]
    )

    useEffect(() => {
        if (requestObj.id !== "" && levels.length) {
            const skillType = levels.find(level => level.id === requestObj?.user?.skillLevelId)
            setClientLevel(skillType)
        }
    },
        [requestObj, levels]
    )

    const showStuff = () => {
        if (userGuide.id === assignedGuide.id) {
            return <section className="assigned" key={`request--${requestObj.id}`}>
                <header className="assigned__header">{requestObj?.user?.name}</header>
                <div>Location: {requestObj?.diveSite?.name}</div>
                <div>Date: {new Date(requestObj.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div>
                <div>Skill Level: {skillLevel.skill}</div>
                <div>
                    {
                        requestObj.completed
                            ?
                            <>
                                <div>Dive Completed</div>
                                <div>Guide Compensation: {((requestObj?.diveSite?.price) / 2).toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                            </>
                            : ""
                    }
                </div>
            </section>
        }
    }
 
    return (
        <>
            <article>
                {
                    showStuff()
                }

            </article>
        </>
    )
}    