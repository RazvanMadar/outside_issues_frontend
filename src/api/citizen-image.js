import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080";
const path_end = {
    image: "/api/citizen/images",
};

const addCitizenImage = (id, image, callback) => {
    let request;
    if (image == null) {
        request = new Request(be_path + path_end.image + "/" + id, {
            method: "POST",
        });
    }
    else {
        const formData = new FormData();
        formData.append("image", image);
        request = new Request(be_path + path_end.image + "/" + id, {
            method: "POST",
            body: formData
        });
    }

    callerApi.callHttpMethod(request, callback);
};

const getCitizenImage = (token, id, callback) => {
    const request = new Request(be_path + path_end.image + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer"
    });

    callerApi.callBlobMethod(request, callback);
};

const deleteCitizenImage = (token, id, callback) => {
    const request = new Request(be_path + path_end.image + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(request, callback);
}

export {addCitizenImage, getCitizenImage, deleteCitizenImage};