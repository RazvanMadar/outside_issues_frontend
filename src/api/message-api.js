import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    message: "/api/messages",
};

const getChatMessages = (token, from, to, callback) => {
    const request = new Request(backend_api + endpoint.message + "?from=" + from + "&to=" + to, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

const getLatestChatMessage = (token, from, to, callback) => {
    const request = new Request(backend_api + endpoint.message + "/latest?fromId=" + from + "&toId=" + to, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

const findLatestMessageByEmail = (token, email, callback) => {
    const request = new Request(backend_api + endpoint.message + "/email/" + email, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

const findLatestMessageById = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.message + "/latest/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

const sendMessage = (token, data, callback) => {
    const request = new Request(backend_api + endpoint.message, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
    });

    restApi.makeRequest(request, callback);
}


export {getChatMessages, sendMessage, getLatestChatMessage, findLatestMessageByEmail, findLatestMessageById};