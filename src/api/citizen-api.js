import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/citizens";

const findCitizenById = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const getCitizens = (token, email, isFiltered, page, size, callback) => {
    let urlPath = be_path + "?";
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
    const httpCall = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const registerCitizen = (data, isAuth, callback) => {
    const httpCall = new Request(be_path + "/auth/?isAuth=" + isAuth, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(httpCall, callback);
}

const updateCitizen = (token, data, callback) => {
    const httpCall = new Request(be_path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(httpCall, callback);
}

const getChatUsersByRole = (token, name, searchPerson, callback) => {
    const httpCall = new Request(be_path + "/role?name=" + name + "&searchPerson=" + searchPerson, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

export {findCitizenById, registerCitizen, getCitizens, getChatUsersByRole, updateCitizen};