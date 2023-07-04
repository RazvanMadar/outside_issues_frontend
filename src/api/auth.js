import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";

const authenticate = (data, callback) => {
    const httpCall = new Request(be_path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    callerApi.callHttpMethod(httpCall, callback);
}

export {authenticate}