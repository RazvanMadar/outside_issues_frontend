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

const filterIssues = (type, state, date, callback) => {
    const request = new Request(
        backend_api +
        endpoint.issue +
        "/filtered?type=" +
        type +
        "&state=" +
        state +
        "&date=" +
        date,
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

export {getIssues, filterIssues, addIssue};
