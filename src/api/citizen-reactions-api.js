import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/citizen-reactions";

const getReactionsForSomeCitizenAndIssue = (token, citizenId, issueId, callback) => {
    let urlPath = be_path + "?";
    if (citizenId !== null) {
        urlPath = urlPath + "citizenId=" + citizenId + "&";
    }
    if (issueId !== null) {
        urlPath = urlPath + "issueId=" + issueId;
    }

    const httpCall = new Request(urlPath, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const addCitizenReaction = (token, reactions, callback) => {
    const httpCall = new Request(be_path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(reactions),
    });

    callerApi.callHttpMethod(httpCall, callback);
};

export {getReactionsForSomeCitizenAndIssue, addCitizenReaction};