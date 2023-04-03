import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    rejected: "/api/rejected",
};

const addRejected = (id, callback) => {
    const request = new Request(backend_api + endpoint.rejected + "?id=" + id, {
        method: "POST",
    });

    restApi.makeRequest(request, callback);
};

const getRejectedForCitizen = (id, callback) => {
    const request = new Request(backend_api + endpoint.rejected + "/" + id, {
        method: "GET"
    });

    restApi.makeRequest(request, callback);
}

const getAllRejected = (callback) => {
    const request = new Request(backend_api + endpoint.rejected, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};


export {addRejected, getRejectedForCitizen, getAllRejected};