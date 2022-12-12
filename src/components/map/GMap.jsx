import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const GMap = () => {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 40, lng: 80 }}
      mapContainerClassName="map-container"
    >
      <Marker position={{ lat: 40, lng: 80 }} />
    </GoogleMap>
  );
};

export default GMap;
