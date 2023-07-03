import callerApi from "../common/api-caller";

const authenticate = (data, callback) => {
    const request = new Request("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(request, callback);
}

export {authenticate}