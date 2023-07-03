import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    citizen: "/api/citizens",
};

const findCitizenById = (token, id, callback) => {
    const request = new Request(be_path + path_end.citizen + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const getCitizens = (token, email, isFiltered, page, size, callback) => {
    let urlPath = be_path + path_end.citizen + "?";
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

    callerApi.callHttpMethod(request, callback);
};

const registerCitizen = (data, isAuth, callback) => {
    const request = new Request(be_path + path_end.citizen + "/auth/?isAuth=" + isAuth, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(request, callback);
}

const updateCitizen = (token, data, callback) => {
    const request = new Request(be_path + path_end.citizen, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(request, callback);
}

const getChatUsersByRole = (token, name, searchPerson, callback) => {
    const request = new Request(be_path + path_end.citizen + "/role?name=" + name + "&searchPerson=" + searchPerson, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

export {findCitizenById, registerCitizen, getCitizens, getChatUsersByRole, updateCitizen};