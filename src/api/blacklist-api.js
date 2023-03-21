import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    blacklist: "/api/blacklists",
};

const isCitizenBlocked = (id, callback) => {
    const request = new Request(backend_api + endpoint.blacklist + "?id=" + id, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};

const addCitizenToBlacklist = (id, callback) => {
    const request = new Request(backend_api + endpoint.blacklist + "/" + id, {
        method: "POST"
    });

    restApi.makeRequest(request, callback);
}

const deleteCitizenFromBlacklist = (id, callback) => {
    const request = new Request(backend_api + endpoint.blacklist + "/" + id, {
        method: "DELETE"
    });

    restApi.makeRequest(request, callback);
}

export {isCitizenBlocked, addCitizenToBlacklist, deleteCitizenFromBlacklist};