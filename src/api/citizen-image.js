import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    image: "/api/citizen/images",
};

const addCitizenImage = (id, image, callback) => {
    const formData = new FormData();
    formData.append("image", image);
    const request = new Request(backend_api + endpoint.image + "/" + id, {
        method: "POST",
        body: formData,
    });

    restApi.makeRequest(request, callback);
};

const getCitizenImage = (id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id, {
        method: "GET",
        responseType: "arraybuffer"
    });

    restApi.makeBlobRequest(request, callback);
};

export {addCitizenImage, getCitizenImage};