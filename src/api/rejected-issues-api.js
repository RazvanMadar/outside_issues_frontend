import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    rejected: "/api/rejected",
};

const addRejected = (token, email, callback) => {
    const request = new Request(backend_api + endpoint.rejected + "?email=" + email, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const getRejectedForCitizen = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.rejected + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

const getAllRejected = (token, callback) => {
    const request = new Request(backend_api + endpoint.rejected, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const getAllRejectedForCitizen = (token, id, email, callback) => {
    const request = new Request(backend_api + endpoint.rejected + "/citizen?id=" + id + "&email=" + email, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};



export {addRejected, getRejectedForCitizen, getAllRejected, getAllRejectedForCitizen};