import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    citizen: "/api/citizens",
};

const findCitizenById = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.citizen + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const getCitizens = (token, email, isFiltered, page, size, callback) => {
    let urlPath = backend_api + endpoint.citizen + "?";
    if (email != null && email != '') {
        urlPath = urlPath + "email=" + email + "&";
    }
    if (isFiltered) {
        urlPath += "isFiltered=" + isFiltered + "&";
    }
    if (page != null) {
        urlPath += "page=" + page + "&";
    }
    if (size != null) {
        urlPath += "size=" + size;
    }
    const request = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const findCitizenByEmail = (token, email, callback) => {
    const request = new Request(backend_api + endpoint.citizen + "/email/" + email, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

const registerCitizen = (data, isAuth, callback) => {
    const request = new Request(backend_api + endpoint.citizen + "/auth/?isAuth=" + isAuth, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    restApi.makeRequest(request, callback);
}

const updateCitizen = (token, data, callback) => {
    const request = new Request(backend_api + endpoint.citizen, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
    });

    restApi.makeRequest(request, callback);
}

const getChatUsersByRole = (token, name, searchPerson, callback) => {
    const request = new Request(backend_api + endpoint.citizen + "/role?name=" + name + "&searchPerson=" + searchPerson, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
};

export {findCitizenById, findCitizenByEmail, registerCitizen, getCitizens, getChatUsersByRole, updateCitizen};