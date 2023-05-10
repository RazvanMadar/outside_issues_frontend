import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    blacklist: "/api/blacklists",
};

const addCitizenToBlacklist = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.blacklist + "/" + id, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

const deleteCitizenFromBlacklist = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.blacklist + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

const getBasicStatistics = (token, callback) => {
    const request = new Request(backend_api + endpoint.blacklist + "/blocked-statistics", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};


export {addCitizenToBlacklist, deleteCitizenFromBlacklist, getBasicStatistics};