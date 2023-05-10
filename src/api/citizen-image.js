import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    image: "/api/citizen/images",
};

const addCitizenImage = (token, id, image, callback) => {
    const formData = new FormData();
    formData.append("image", image);
    const request = new Request(backend_api + endpoint.image + "/" + id, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });

    restApi.makeRequest(request, callback);
};

const getCitizenImage = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer"
    });

    restApi.makeBlobRequest(request, callback);
};

const deleteCitizenImage = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeRequest(request, callback);
}

export {addCitizenImage, getCitizenImage, deleteCitizenImage};