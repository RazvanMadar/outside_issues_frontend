import React, {useMemo, useRef, useState} from "react";
import {Marker} from "react-leaflet";
import {createIcon} from "../../common/converter-util";
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
  const centerPosition = useState(center);
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
            marker.setLatLng(centerPosition);
            setPosition(centerPosition);
            passMarkerPosition(centerPosition);
          } else {
            setPosition(newMarkerPosition);
            passMarkerPosition(newMarkerPosition);
          }
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
