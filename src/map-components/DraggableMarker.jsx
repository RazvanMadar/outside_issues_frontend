import React, { useMemo, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import { createIcon } from "../common/geo-converter";
import useGeoLocation from "../hooks/useGeoLocation";
import marker from "../pages/images/gps.png";

const center = {
  lat: 46.773,
  lng: 23.625,
};

const flagIcon = createIcon(marker);

const DraggableMarker = ({passMarkerPosition}) => {
  const currentLocation = useGeoLocation();
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          passMarkerPosition(marker.getLatLng());
          console.log(marker.getLatLng());
        }
      },
    }),
    []
  );

  //   const CurrentLocationMarker = () => {
  //     const map = useMapEvents({
  //       click() {
  //         map.locate();
  //       },
  //       locationfound(e) {
  //         setPosition(e.latlng);
  //         map.flyTo(e.latlng, map.getZoom());
  //         setIsClicked(true);
  //       },
  //     });

  //     return (
  //       isClicked && (
  //         <Marker position={position} icon={flagIcon} ref={markerRef}>
  //           <Popup>You are here</Popup>
  //         </Marker>
  //       )
  //     );
  //   };

  return (
    // {currentLocation.loaded && setPosition(currentLocation.coordinates)}
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={flagIcon}
    ></Marker>
  );
};

export default DraggableMarker;
