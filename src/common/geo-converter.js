import Geocode from "react-geocode";
import L from "leaflet";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);

const createIcon = (icon, type, isWorkingIcon) =>
    new L.Icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        popupAnchor: [-0, -0],
        iconSize: isWorkingIcon ? [21, 21] : type ? [36, 36] : [17, 17],
    });

export { createIcon};
