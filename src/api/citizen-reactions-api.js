import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    reaction: "/api/citizen-reactions",
};

const getReactionsForSomeCitizenAndIssue = (token, citizenId, issueId, callback) => {
    let urlPath = be_path + path_end.reaction + "?";
    if (citizenId !== null) {
        urlPath = urlPath + "citizenId=" + citizenId + "&";;
    }
    if (issueId !== null) {
        urlPath = urlPath + "issueId=" + issueId;
    }

    const request = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
};

const addCitizenReaction = (token, reactions, callback) => {
    const request = new Request(be_path + path_end.reaction, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(reactions),
    });

    callerApi.callHttpMethod(request, callback);
};

export {getReactionsForSomeCitizenAndIssue, addCitizenReaction};