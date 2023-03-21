import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    email: "/api/email",
};

const sendEmail = (data, callback) => {
    const request = new Request(backend_api + endpoint.email, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    restApi.makeRequest(request, callback);
}

export {sendEmail};