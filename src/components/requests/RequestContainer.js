import { useState } from "react"
import { RequestList } from "./RequestList"
import { RequestSearch } from "./RequestSearch"

export const RequestContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")

    return (
        <>
            <RequestSearch setterFunction={setSearchTerms} />
            <RequestList searchTermsState={searchTerms} />
        </>
    )
}




