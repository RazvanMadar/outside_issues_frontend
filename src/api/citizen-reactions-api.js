import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    reaction: "/api/citizen-reactions",
};

const getReactionsForSomeCitizenAndIssue = (token, citizenId, issueId, callback) => {
    let urlPath = backend_api + endpoint.reaction + "?";
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

    restApi.makeRequest(request, callback);
};

const addCitizenReaction = (token, reactions, callback) => {
    const request = new Request(backend_api + endpoint.reaction, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(reactions),
    });

    restApi.makeRequest(request, callback);
};

export {getReactionsForSomeCitizenAndIssue, addCitizenReaction};