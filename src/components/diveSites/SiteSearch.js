
export const SiteSearch = ({ setFun }) => {
    return (
        <div>
            <input className="search"
                onChange={
                    (changeEvent) => {
                        setFun(changeEvent.target.value)
                    }
                }
                type="text" placeholder="Search Locations" />
        </div>
    )
} 