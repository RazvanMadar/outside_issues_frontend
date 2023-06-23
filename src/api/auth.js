import restApi from "../common/rest-api";

const authenticate = (data, callback) => {
    const request = new Request("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    restApi.makeRequest(request, callback);
}

export {authenticate}