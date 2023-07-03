import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    image: "/api/images",
};

const addImage = (id, image, number, callback) => {
    const formData = new FormData();
    formData.append("image", image);
    const request = new Request(be_path + path_end.image + "/" + id + "?number=" + number, {
        method: "POST",
        body: formData,
    });

    callerApi.callHttpMethod(request, callback);
};

const getFirstImage = (token, id, callback) => {
    const request = new Request(be_path + path_end.image + "/" + id + "/first", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer"
    });

    callerApi.callBlobMethod(request, callback);
};

const getSecondImage = (token, id, callback) => {
    const request = new Request(be_path + path_end.image + "/" + id + "/second", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callBlobMethod(request, callback);
};

const getThirdImage = (token, id, callback) => {
    const request = new Request(be_path + path_end.image + "/" + id + "/third", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callBlobMethod(request, callback);
};

export {addImage, getFirstImage, getSecondImage, getThirdImage};