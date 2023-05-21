import React, {useMemo, useRef, useState} from "react";
import {Marker} from "react-leaflet";
import {createIcon} from "../../common/geo-converter";
import marker from "../../pages/images/gps.png";
import L from 'leaflet';
import {booleanPointInPolygon} from '@turf/turf';

const center = {
  lat: 47.06329517311617,
  lng: 21.927439387113623
};

const flagIcon = createIcon(marker, true);

const DraggableMarker = ({passMarkerPosition, polygonCoordinates}) => {
  const [position, setPosition] = useState(center);
  const [lastValidPosition, setLastValidPosition] = useState(center);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newMarkerPosition = marker.getLatLng();
          const point = [newMarkerPosition.lng, newMarkerPosition.lat];
          const polygon = L.polygon(polygonCoordinates).toGeoJSON();
          if (!booleanPointInPolygon(point, polygon)) {
            marker.setLatLng(lastValidPosition);
            setPosition(lastValidPosition);
            passMarkerPosition(lastValidPosition);
          } else {
            setPosition(newMarkerPosition);
            passMarkerPosition(newMarkerPosition);
          }
          console.log(marker.getLatLng());
        }
      },
    }),
    [passMarkerPosition, polygonCoordinates]
  );

  const markerOptions = useMemo(() => ({ draggable: true }), []);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={flagIcon}
      {...markerOptions}
    ></Marker>
  );
};

export default DraggableMarker;
