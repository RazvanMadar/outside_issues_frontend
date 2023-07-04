import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/email";

const sendEmail = (token, data, callback) => {
    const httpCall = new Request(be_path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(httpCall, callback);
}

export {sendEmail};