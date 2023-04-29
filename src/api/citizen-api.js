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

const getCitizens = (email, page, size, callback) => {
    let urlPath = backend_api + endpoint.citizen + "?";
    if (email != null && email != '') {
        urlPath = urlPath + "email=" + email + "&";
    }
    if (page != null) {
        urlPath += "page=" + page + "&";
    }
    if (size != null) {
        urlPath += "size=" + size;
    }
    const request = new Request(urlPath, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};

const findCitizenByEmail = (email, callback) => {
    const request = new Request(backend_api + endpoint.citizen + "/email/" + email, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};

const registerCitizen = (data, callback) => {
    const request = new Request(backend_api + endpoint.citizen, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    restApi.makeRequest(request, callback);
}

const getChatUsersByRole = (name, callback) => {
    const request = new Request(backend_api + endpoint.citizen + "/role?name=" + name, {
        method: "GET",
    });

    restApi.makeRequest(request, callback);
};

export {findCitizenById, findCitizenByEmail, registerCitizen, getCitizens, getChatUsersByRole};