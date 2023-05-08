import React from 'react';
import { Map, TileLayer } from 'leaflet';
import { useMap } from 'react-leaflet';

const MapTest = () => {
    const { map } = useMap();

    return (
        <Map style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={19}
                opacity={0.5}
            />
        </Map>
    );
};

export default MapTest;