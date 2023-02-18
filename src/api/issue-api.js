import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    issue: "/api/issues",
};

const getIssues = (hasLocation, callback) => {
    const request = new Request(backend_api + endpoint.issue + "?hasLocation=" + hasLocation, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};

const filterIssues = (type, state, fromDate, toDate, hasLocation, page, size, callback) => {
    let urlPath = backend_api + endpoint.issue + "/filtered?";
    if (type) {
        urlPath += "type=" + type + "&";
    }
    if (state) {
        urlPath += "state=" + state + "&";
    }
    if (fromDate) {
        urlPath += "fromDate=" + fromDate + "&";
    }
    if (toDate) {
        urlPath += "toDate=" + toDate + "&";
    }
    if (hasLocation) {
        urlPath += "hasLocation=" + hasLocation + "&";
    }
    if (page) {
        urlPath += "page=" + page + "&";
    }
    if (size) {
        urlPath += "size=" + size;
    }
    urlPath += "&sort=id,desc"
    const request = new Request(
        urlPath,
        {
            method: "GET",
        }
    );

    restApi.makeRequest(request, callback);
};

const addIssue = (issue, callback) => {
    const request = new Request(backend_api + endpoint.issue, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
    });

    restApi.makeRequest(request, callback);
};

const findIssueById = (id, callback) => {
    const request = new Request(backend_api + endpoint.issue + "/" + id, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};

const updateIssue = (id, type, state, callback) => {
    let urlPath = backend_api + endpoint.issue + `/${id}?`;
    if (type) {
        urlPath += "type=" + type + "&";
    }
    if (state) {
        urlPath += "state=" + state;
    }
    const request = new Request(urlPath, {
        method: "PUT",
    });

    restApi.makeRequest(request, callback);
};

const deleteIssueById = (id, callback) => {
    const request = new Request(backend_api + endpoint.issue + "/" + id, {
        method: "DELETE",
    });

    restApi.makeRequest(request, callback);
};


export {getIssues, filterIssues, addIssue, findIssueById, updateIssue, deleteIssueById};
