// json-server database.json -p 8088 -w

// GET requests
export const getSites = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveSites?_sort=siteName`)
        .then(res => res.json())
}

export const getRequests = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests?_expand=user&_expand=diveSite&_embed=assignedDives&_sort=date`)
        .then(res => res.json())
}

export const getEditRequests = (requestId) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests/${requestId}`)
        .then(res => res.json())
}

export const getGuides = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/guides?_expand=user`)
        .then(res => res.json())
}

export const getAssigns = (assignId) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests/${assignId}?_expand=diveSite&_expand=user`)
        .then(res => res.json())
}

export const getAssignedDives = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/assignedDives?_expand=guide`)
        .then(res => res.json())
}

export const getUsers = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/users`)
        .then(res => res.json())
}

export const getCompletedDives = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests?_expand=diveSite&_expand=user&completed=true&_sort=date&_order=desc`)
        .then(res => res.json())
}

export const getEditSites = (siteId) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveSites/${siteId}`)
        .then(res => res.json())
}

export const getClients = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/users?isStaff=false`)
        .then(res => res.json())
}

export const getClient = (clientId) => {
    return fetch(`https://shark-bait-api.herokuapp.com/users/${clientId}`)
        .then(res => res.json())
}

export const getLevels = () => {
    return fetch(`https://shark-bait-api.herokuapp.com/skillLevels`)
    .then(res => res.json())
}

export const getClientDetails = (clientId) => {
    return fetch(`https://shark-bait-api.herokuapp.com/users/${clientId}?_embed=diveRequests`)
    .then(res => res.json())
}


// POST requests 
export const saveSites = (sites) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveSites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sites)
    })
        .then(res => res.json())
}

export const saveRequests = (request) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(res => res.json())
}

export const saveAssigned = (assigned) => {
    return fetch(`https://shark-bait-api.herokuapp.com/assignedDives`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assigned)
    })
        .then(res => res.json())
}

// PUT requests 
export const saveRequestEdit = (requestId, request) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests/${requestId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(res => res.json())
}

export const saveCompletedRequest = (requestObj, reqComplete) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests/${requestObj.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqComplete)
        })
        .then(res => res.json())
}

export const saveSiteEdit = (siteId, site) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveSites/${siteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(site)
    })
        .then(res => res.json())
}

export const saveUserEdit = (clientId, user) => {
    return fetch(`https://shark-bait-api.herokuapp.com/users/${clientId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}


// DELETE requests 
export const deleteRequest = (requestObj) => {
    return fetch(`https://shark-bait-api.herokuapp.com/diveRequests/${requestObj.id}`, {
        method: "DELETE",
    })
}

