import Geocode from "react-geocode";
import L from "leaflet";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);

const getCoordinatesFromAddress = (props) => {
    Geocode.fromAddress(props).then(
        (response) => {
            const {lat, lng} = response.results[0].geometry.location;
            return {lat, lng};
        },
        (error) => {
            console.error(error);
        }
    );
};

const createIcon = (icon, type) =>
    new L.Icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        popupAnchor: [-0, -0],
        iconSize: type ? [35, 35] : [17, 17],
    });

export {getCoordinatesFromAddress, createIcon};
