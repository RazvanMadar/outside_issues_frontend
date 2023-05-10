import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";

const sendMessageViaWebSocket = (token, message, callback) => {
    const request = new Request(backend_api + "/send-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(message),
    });

    restApi.makeRequest(request, callback);
};

export {
    sendMessageViaWebSocket
};
