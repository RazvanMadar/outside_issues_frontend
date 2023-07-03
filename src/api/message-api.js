import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    message: "/api/messages",
};

const getChatMessages = (token, from, to, callback) => {
    const request = new Request(be_path + path_end.message + "?from=" + from + "&to=" + to, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
}

const getLatestChatMessage = (token, from, to, callback) => {
    const request = new Request(be_path + path_end.message + "/latest?fromId=" + from + "&toId=" + to, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
}

export {getChatMessages, getLatestChatMessage};