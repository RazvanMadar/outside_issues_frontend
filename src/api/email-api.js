import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    email: "/api/email",
};

const sendEmail = (token, data, callback) => {
    const request = new Request(be_path + path_end.email, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(request, callback);
}

export {sendEmail};