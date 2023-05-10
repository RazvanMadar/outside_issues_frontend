import React, { useMemo, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import { createIcon } from "../common/geo-converter";
import useGeoLocation from "../hooks/useGeoLocation";
import marker from "../pages/images/gps.png";
import { pointInLayer } from "leaflet-pip";
import L from 'leaflet';

const center = {
  lat: 47.06329517311617,
  lng: 21.927439387113623
};

const flagIcon = createIcon(marker, true);

const DraggableMarker = ({passMarkerPosition, polygonCoordinates}) => {
  const currentLocation = useGeoLocation();
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newMarkerPosition = marker.getLatLng();
          const insidePolygon = pointInLayer(newMarkerPosition, L.geoJSON(polygonCoordinates));

          if (!insidePolygon) {
            marker.setLatLng(center);
            setPosition(center);
            passMarkerPosition(center);
          } else {
            setPosition(newMarkerPosition);
            passMarkerPosition(newMarkerPosition);
          }

          // setPosition(marker.getLatLng());
          // passMarkerPosition(marker.getLatLng());
          console.log(marker.getLatLng());
        }
      },
    }),
    [passMarkerPosition, polygonCoordinates]
  );

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
