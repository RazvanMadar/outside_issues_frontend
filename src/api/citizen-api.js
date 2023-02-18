import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    citizen: "/api/citizens",
};

const findCitizenById = (id, callback) => {
    const request = new Request(backend_api + endpoint.citizen + "/" + id, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};


export {findCitizenById};