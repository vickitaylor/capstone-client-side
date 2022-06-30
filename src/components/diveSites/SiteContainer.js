import { useState } from "react"
import { DiveSiteList } from "./DiveSiteList"
import { SiteSearch } from "./SiteSearch"

export const SiteContainer = () => {

    const [siteSearch, setSiteSearch] = useState("")

    return (
        <>
            <SiteSearch setFun={setSiteSearch} />
            <DiveSiteList siteSearchState={siteSearch} />
        </>
    )

}