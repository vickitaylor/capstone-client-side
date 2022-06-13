// GET requests

export const getSites = () => {
    return fetch(`http://localhost:8088/diveSites?_sort=siteName`)
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
    return fetch(`http://localhost:8088/diveRequest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(res => res.json())
}

// PUT requests 

// DELETE requests 