import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/messages";

const getChatMessages = (token, from, to, callback) => {
    const httpCall = new Request(be_path + "?from=" + from + "&to=" + to, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
}

const getLatestChatMessage = (token, from, to, callback) => {
    const httpCall = new Request(be_path + "/latest?fromId=" + from + "&toId=" + to, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
}

export {getChatMessages, getLatestChatMessage};