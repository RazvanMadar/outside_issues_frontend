import Geocode from "react-geocode";
import L from "leaflet";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);

const getCoordinatesFromAddress = (props) => {
  Geocode.fromAddress(props).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    },
    (error) => {
      console.error(error);
    }
  );
};

const createIcon = (icon) =>
  new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    popupAnchor: [-0, -0],
    iconSize: [30, 30],
  });

export { getCoordinatesFromAddress, createIcon };
