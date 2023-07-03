import callerApi from "../common/api-caller";

const openStreetMapGetAddressAPI = "https://nominatim.openstreetmap.org/reverse?";

const getAddressFromCoordinates = (address, callback) => {
    const latitude = address.lat;
    const longitude = address.lng;
    if (latitude != null && longitude != null) {
        const request = new Request(openStreetMapGetAddressAPI + "lat=" + latitude + "&lon=" + longitude + "&format=json", {
            method: "GET",
        });

        callerApi.callHttpMethod(request, callback);
    }
};

export {getAddressFromCoordinates};