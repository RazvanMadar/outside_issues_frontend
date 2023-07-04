import callerApi from "../common/api-caller";

const be_path = "http://localhost:8080/api/citizen/images";

const addCitizenImage = (id, image, callback) => {
    let httpCall;
    if (image == null) {
        httpCall = new Request(be_path + "/" + id, {
            method: "POST",
        });
    }
    else {
        const formData = new FormData();
        formData.append("image", image);
        httpCall = new Request(be_path + "/" + id, {
            method: "POST",
            body: formData
        });
    }

    callerApi.callHttpMethod(httpCall, callback);
};

const getCitizenImage = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer"
    });

    callerApi.callBlobMethod(httpCall, callback);
};

const deleteCitizenImage = (token, id, callback) => {
    const httpCall = new Request(be_path + "/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    callerApi.callHttpMethod(httpCall, callback);
}

export {addCitizenImage, getCitizenImage, deleteCitizenImage};