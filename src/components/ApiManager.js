// GET requests

export const getSites = () => {
    return fetch(`http://localhost:8088/diveSites?_sort=siteName`)
        .then(res => res.json())
}

export const getRequests = () => {
    return fetch(`http://localhost:8088/diveRequests?_expand=user&_expand=diveSite`)
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


// DELETE requests 
export const deleteRequest = (requestObj) => {
    return fetch(`http://localhost:8088/diveRequests/${requestObj.id}`, {
        method: "DELETE",
    })
}