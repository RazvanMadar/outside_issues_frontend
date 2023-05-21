import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    issue: "/api/issues",
};

const getBasicStatistics = (token, email, callback) => {
    let urlPath = backend_api + endpoint.issue + "/basic-statistics?";
    if (email) {
        urlPath = urlPath + "email=" + email;
    }
    const request = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const getYearStatistics = (token, callback) => {
    const request = new Request(backend_api + endpoint.issue + "/year-statistics?", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const getTypeStatistics = (token, email, callback) => {
    let urlPath = backend_api + endpoint.issue + "/type-statistics?";
    if (email !== null) {
        urlPath = urlPath + "email=" + email;
    }
    const request = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const filterIssues = (token, type, state, fromDate, toDate, hasLocation, all, page, size, sort, order, callback) => {
    let urlPath = backend_api + endpoint.issue + "/filtered?";
    if (type !== null) {
        urlPath += "type=" + type + "&";
    }
    if (state !== null) {
        urlPath += "state=" + state + "&";
    }
    if (fromDate !== null) {
        urlPath += "fromDate=" + fromDate + "&";
    }
    if (toDate !== null) {
        urlPath += "toDate=" + toDate + "&";
    }
    if (hasLocation !== null) {
        urlPath += "hasLocation=" + hasLocation + "&";
    }
    if (all !== null) {
        urlPath += "all=" + all + "&";
    }
    if (page !== null) {
        urlPath += "page=" + page + "&";
    }
    if (size !== null) {
        urlPath += "size=" + size + "&";
    }
    if (sort !== null) {
        urlPath += "sort=" + sort;
    }
    if (order !== null) {
        urlPath += "," + order;
    }
    urlPath += "&sort=id,desc"
    const request = new Request(urlPath, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    restApi.makeRequest(request, callback);
};

const filterIssuesByCitizenEmail = (token, email, page, size, sort, order, callback) => {
    let urlPath = backend_api + endpoint.issue + "/email/" + email + "?";
    if (page != null) {
        urlPath += "page=" + page + "&";
    }
    if (size != null) {
        urlPath += "size=" + size + "&";
    }
    if (sort != null) {
        urlPath += "sort=" + sort;
    }
    if (order != null) {
        urlPath += "," + order;
    }
    console.log(urlPath)
    const request = new Request(urlPath, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    restApi.makeRequest(request, callback);
};

const addIssue = (token, issue, callback) => {
    const request = new Request(backend_api + endpoint.issue, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(issue),
    });

    restApi.makeRequest(request, callback);
};

const findIssueById = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.issue + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const updateIssue = (token, id, type, state, callback) => {
    let urlPath = backend_api + endpoint.issue + `/${id}?`;
    if (type != null) {
        urlPath += "type=" + type + "&";
    }
    if (state != null) {
        urlPath += "state=" + state;
    }
    const request = new Request(urlPath, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const deleteIssueById = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.issue + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};


export {
    filterIssues,
    addIssue,
    findIssueById,
    updateIssue,
    deleteIssueById,
    getBasicStatistics,
    filterIssuesByCitizenEmail,
    getYearStatistics,
    getTypeStatistics
};
