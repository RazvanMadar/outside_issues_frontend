import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    issue: "/api/images",
};

const addImage = (id, image, number, callback) => {
    const formData = new FormData();
    formData.append("image", image);
    const request = new Request(backend_api + endpoint.issue + "/" + id + "?number=" + number, {
        method: "POST",
        body: formData,
    });

    restApi.makeRequest(request, callback);
};

export {addImage};