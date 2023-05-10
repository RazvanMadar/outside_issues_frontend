import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    image: "/api/images",
};

const addImage = (token, id, image, number, callback) => {
    const formData = new FormData();
    formData.append("image", image);
    const request = new Request(backend_api + endpoint.image + "/" + id + "?number=" + number, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: formData,
    });

    restApi.makeRequest(request, callback);
};

const getFirstImage = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id + "/first", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer"
    });

    restApi.makeBlobRequest(request, callback);
};

const getSecondImage = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id + "/second", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeBlobRequest(request, callback);
};

const getThirdImage = (token, id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id + "/third", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    restApi.makeBlobRequest(request, callback);
};

export {addImage, getFirstImage, getSecondImage, getThirdImage};