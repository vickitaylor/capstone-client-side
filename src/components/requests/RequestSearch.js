
export const RequestSearch = ({setterFunction}) => {
    return (
        <div>
            <input className="search"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" placeholder="Search the Requests" />
        </div>
    )
} 