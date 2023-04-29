import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    message: "/api/messages",
};

const getChatMessages = (from, to, callback) => {
    const request = new Request(backend_api + endpoint.message + "?from=" + from + "&to=" + to, {
        method: "GET"
    });

    restApi.makeRequest(request, callback);
}

const getLatestChatMessage = (from, to, callback) => {
    const request = new Request(backend_api + endpoint.message + "/latest?from=" + from + "&to=" + to, {
        method: "GET"
    });

    restApi.makeRequest(request, callback);
}

const findLatestMessageByEmail = (email, callback) => {
    const request = new Request(backend_api + endpoint.message + "/email/" + email, {
        method: "GET"
    });

    restApi.makeRequest(request, callback);
}

const sendMessage = (data, callback) => {
    const request = new Request(backend_api + endpoint.message, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    restApi.makeRequest(request, callback);
}


export {getChatMessages, sendMessage, getLatestChatMessage, findLatestMessageByEmail};