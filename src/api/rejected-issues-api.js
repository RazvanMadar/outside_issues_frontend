import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/rejected";

const addRejected = (token, email, callback) => {
    const httpCall = new Request(be_path + "?email=" + email, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const getAllRejected = (token, callback) => {
    const httpCall = new Request(be_path, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const getAllRejectedForCitizen = (token, id, email, callback) => {
    const httpCall = new Request(be_path + "/citizen?id=" + id + "&email=" + email, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};



export {addRejected, getAllRejected, getAllRejectedForCitizen};