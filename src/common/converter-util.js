import L from "leaflet";

const createIcon = (icon, type, isWorkingIcon) =>
    new L.Icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        popupAnchor: [-0, -0],
        iconSize: isWorkingIcon ? [21, 21] : type ? [36, 36] : [17, 17],
    });

export { createIcon};
