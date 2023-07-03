import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    rejected: "/api/rejected",
};

const addRejected = (token, email, callback) => {
    const request = new Request(be_path + path_end.rejected + "?email=" + email, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const getAllRejected = (token, callback) => {
    const request = new Request(be_path + path_end.rejected, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const getAllRejectedForCitizen = (token, id, email, callback) => {
    const request = new Request(be_path + path_end.rejected + "/citizen?id=" + id + "&email=" + email, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};



export {addRejected, getAllRejected, getAllRejectedForCitizen};