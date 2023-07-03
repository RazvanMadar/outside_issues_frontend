import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    issue: "/api/issues",
};

const getBasicStatistics = (token, email, callback) => {
    let urlPath = be_path + path_end.issue + "/basic-statistics?";
    if (email) {
        urlPath = urlPath + "email=" + email;
    }
    const request = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const getYearStatistics = (token, callback) => {
    const request = new Request(be_path + path_end.issue + "/year-statistics?", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const getTypeStatistics = (token, email, callback) => {
    let urlPath = be_path + path_end.issue + "/type-statistics?";
    if (email !== null) {
        urlPath = urlPath + "email=" + email;
    }
    const request = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const filterIssues = (token, type, state, fromDate, toDate, hasLocation, all, page, size, sort, order, callback) => {
    let urlPath = be_path + path_end.issue + "/filtered?";
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
    const request = new Request(urlPath, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    callerApi.callHttpMethod(request, callback);
};

const filterIssuesByCitizenEmail = (token, email, page, size, sort, order, callback) => {
    let urlPath = be_path + path_end.issue + "/email/" + email + "?";
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
    console.log(urlPath)
    const request = new Request(urlPath, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    callerApi.callHttpMethod(request, callback);
};

const addIssue = (token, issue, callback) => {
    const request = new Request(be_path + path_end.issue, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(issue),
    });

    callerApi.callHttpMethod(request, callback);
};

const updateIssue = (token, id, type, state, callback) => {
    let urlPath = be_path + path_end.issue + `/${id}?`;
    if (type != null) {
        urlPath += "type=" + type + "&";
    }
    if (state != null) {
        urlPath += "state=" + state;
    }
    const request = new Request(urlPath, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const deleteIssueById = (token, id, callback) => {
    const request = new Request(be_path + path_end.issue + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
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
