import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/issues";

const getBasicStatistics = (token, email, callback) => {
    let urlPath = be_path + "/basic-statistics?";
    if (email) {
        urlPath = urlPath + "email=" + email;
    }
    const httpCall = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const getYearStatistics = (token, callback) => {
    const httpCall = new Request(be_path + "/year-statistics?", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const getTypeStatistics = (token, email, callback) => {
    let urlPath = be_path + "/type-statistics?";
    if (email !== null) {
        urlPath = urlPath + "email=" + email;
    }
    const httpCall = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const filterIssues = (token, type, state, fromDate, toDate, hasLocation, all, page, size, sort, order, callback) => {
    let urlPath = be_path + "/filtered?";
    if (type !== null) {
        urlPath += "type=" + type + "&";
    }
    if (state !== null) {
        urlPath += "state=" + state + "&";
    }
    if (fromDate !== null) {
        urlPath += "fromDate=" + fromDate + "&";
    }
    if (toDate !== null) {
        urlPath += "toDate=" + toDate + "&";
    }
    if (hasLocation !== null) {
        urlPath += "hasLocation=" + hasLocation + "&";
    }
    if (all !== null) {
        urlPath += "all=" + all + "&";
    }
    if (page !== null) {
        urlPath += "page=" + page + "&";
    }
    if (size !== null) {
        urlPath += "size=" + size + "&";
    }
    if (sort !== null) {
        urlPath += "sort=" + sort;
    }
    if (order !== null) {
        urlPath += "," + order;
    }
    urlPath += "&sort=id,desc"
    const httpCall = new Request(urlPath, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    callerApi.callHttpMethod(httpCall, callback);
};

const filterIssuesByCitizenEmail = (token, email, page, size, sort, order, callback) => {
    let urlPath = be_path + "/email/" + email + "?";
    if (page != null) {
        urlPath += "page=" + page + "&";
    }
    if (size != null) {
        urlPath += "size=" + size + "&";
    }
    if (sort != null) {
        urlPath += "sort=" + sort;
    }
    if (order != null) {
        urlPath += "," + order;
    }
    const httpCall = new Request(urlPath, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    callerApi.callHttpMethod(httpCall, callback);
};

const addIssue = (token, issue, callback) => {
    const httpCall = new Request(be_path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(issue),
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const updateIssue = (token, id, type, state, callback) => {
    let urlPath = be_path + `/${id}?`;
    if (type != null) {
        urlPath += "type=" + type + "&";
    }
    if (state != null) {
        urlPath += "state=" + state;
    }
    const httpCall = new Request(urlPath, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const deleteIssueById = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};


export {
    filterIssues,
    addIssue,
    updateIssue,
    deleteIssueById,
    getBasicStatistics,
    filterIssuesByCitizenEmail,
    getYearStatistics,
    getTypeStatistics
};
