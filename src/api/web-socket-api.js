import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/send-message";

const sendMessageViaWebSocket = (token, message, callback) => {
    const httpCall = new Request(be_path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(message),
    });

    callerApi.callHttpMethod(httpCall, callback);
};

export {
    sendMessageViaWebSocket
};
