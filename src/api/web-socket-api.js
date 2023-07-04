import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";

const sendMessageViaWebSocket = (token, message, callback) => {
    const httpCall = new Request(be_path + "/send-message", {
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
