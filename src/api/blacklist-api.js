import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    blacklist: "/api/blacklists",
};

const addCitizenToBlacklist = (token, id, callback) => {
    const request = new Request(be_path + path_end.blacklist + "/" + id, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
}

const deleteCitizenFromBlacklist = (token, id, callback) => {
    const request = new Request(be_path + path_end.blacklist + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
}

const getBasicStatistics = (token, callback) => {
    const request = new Request(be_path + path_end.blacklist + "/blocked-statistics", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};


export {addCitizenToBlacklist, deleteCitizenFromBlacklist, getBasicStatistics};