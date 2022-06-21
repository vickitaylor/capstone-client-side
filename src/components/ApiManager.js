// GET requests
export const getSites = () => {
    return fetch(`http://localhost:8088/diveSites?_sort=siteName`)
        .then(res => res.json())
}

export const getRequests = () => {
    return fetch(`http://localhost:8088/diveRequests?_expand=user&_expand=diveSite&_embed=assignedDives&_sort=date`)
        .then(res => res.json())
}

export const getEditRequests = (requestId) => {
    return fetch(`http://localhost:8088/diveRequests/${requestId}`)
        .then(res => res.json())
}

export const getGuides = () => {
    return fetch(`http://localhost:8088/guides?_expand=user`)
        .then(res => res.json())
}

export const getAssigns = (assignId) => {
    return fetch(`http://localhost:8088/diveRequests/${assignId}?_expand=diveSite&_expand=user`)
        .then(res => res.json())
}

export const getAssignedDives = () => {
    return fetch(`http://localhost:8088/assignedDives?_expand=guide`)
    .then(res => res.json())
}

export const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then(res => res.json())
}

export const getCompletedDives = () => {
    return fetch(`http://localhost:8088/diveRequests?_expand=diveSite&&_expand=user&completed=true`)
    .then(res => res.json())
}

// POST requests 
export const saveSites = (sites) => {
    return fetch(`http://localhost:8088/diveSites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sites)
    })
        .then(res => res.json())
}

export const saveRequests = (request) => {
    return fetch(`http://localhost:8088/diveRequests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(res => res.json())
}

export const saveAssigned = (assigned) => {
    return fetch(`http://localhost:8088/assignedDives`, {
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
    return fetch(`http://localhost:8088/diveRequests/${requestId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(res => res.json())
}

export const saveCompletedRequest = (requestObj, reqComplete) => {
    return fetch(`http://localhost:8088/diveRequests/${requestObj.id}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqComplete)
    })
    .then(res => res.json())
}

// DELETE requests 
export const deleteRequest = (requestObj) => {
    return fetch(`http://localhost:8088/diveRequests/${requestObj.id}`, {
        method: "DELETE",
    })
}

