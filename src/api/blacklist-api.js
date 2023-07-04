import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/blacklists";

const addCitizenToBlacklist = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
}

const deleteCitizenFromBlacklist = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
}

const getBasicStatistics = (token, callback) => {
    const httpCall = new Request(be_path + "/blocked-statistics", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};


export {addCitizenToBlacklist, deleteCitizenFromBlacklist, getBasicStatistics};