import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/images";

const addImage = (id, image, number, callback) => {
    const imgData = new FormData();
    imgData.append("image", image);
    const httpCall = new Request(be_path + "/" + id + "?number=" + number, {
        method: "POST",
        body: imgData,
    });

    callerApi.callHttpMethod(httpCall, callback);
};

const getFirstImage = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id + "/first", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer"
    });

    callerApi.callBlobMethod(httpCall, callback);
};

const getSecondImage = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id + "/second", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callBlobMethod(httpCall, callback);
};

const getThirdImage = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id + "/third", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callBlobMethod(httpCall, callback);
};

export {addImage, getFirstImage, getSecondImage, getThirdImage};