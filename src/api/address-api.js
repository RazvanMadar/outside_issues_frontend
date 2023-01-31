import restApi from "../common/rest-api";

const openStreetMapGetAddressAPI = "https://nominatim.openstreetmap.org/reverse?";

const getAddressFromCoordinates = (address, callback) => {
    const latitude = address.lat;
    const longitude = address.lng;
    console.log(address, latitude, longitude)
    if (latitude != null && longitude != null) {
        const request = new Request(openStreetMapGetAddressAPI + "lat=" + latitude + "&lon=" + longitude + "&format=json", {
            method: "GET",
        });

        restApi.makeRequest(request, callback);
    }
};

export {getAddressFromCoordinates};