import restApi from "../common/rest-api";

const backend_api = "http://localhost:8080";
const endpoint = {
    image: "/api/images",
};

const addImage = (id, image, number, callback) => {
    const formData = new FormData();
    formData.append("image", image);
    const request = new Request(backend_api + endpoint.image + "/" + id + "?number=" + number, {
        method: "POST",
        body: formData,
    });

    restApi.makeRequest(request, callback);
};

const getFirstImage = (id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id + "/first", {
        method: "GET",
        responseType: "arraybuffer"
    });

    restApi.makeBlobRequest(request, callback);
};

const getSecondImage = (id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id + "/second", {
        method: "GET",
    });

    restApi.makeBlobRequest(request, callback);
};

const getThirdImage = (id, callback) => {
    const request = new Request(backend_api + endpoint.image + "/" + id + "/third", {
        method: "GET",
    });

    restApi.makeBlobRequest(request, callback);
};

export {addImage, getFirstImage, getSecondImage, getThirdImage};