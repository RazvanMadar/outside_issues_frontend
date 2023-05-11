import React, {useState} from "react";
import {Marker, MapContainer, TileLayer, Popup, Polygon} from "react-leaflet";
import classes from "./IssueMapOSM.module.css";
import plus from "./images/plus.png";
import REGISTERED_ROAD from "./images/REGISTERED_ROAD.png";
import REGISTERED_LIGHTNING from "./images/REGISTERED_LIGHTNING.png";
import REGISTERED_PUBLIC_DISORDER from "./images/REGISTERED_PUBLIC_DISORDER.png";
import REGISTERED_GREEN_SPACES from "./images/REGISTERED_GREEN_SPACES.png";
import REGISTERED_PUBLIC_DOMAIN from "./images/REGISTERED_PUBLIC_DOMAIN.png";
import REGISTERED_PUBLIC_TRANSPORT from "./images/REGISTERED_PUBLIC_TRANSPORT.png";
import REGISTERED_BUILDINGS from "./images/REGISTERED_BUILDINGS.png";
import REGISTERED_ROAD_SIGNS from "./images/REGISTERED_ROAD_SIGNS.png";
import REGISTERED_ANIMALS from "./images/REGISTERED_ANIMALS.png";
import PLANNED_ROAD from "./images/PLANNED_ROAD2.png";
import PLANNED_LIGHTNING from "./images/PLANNED_LIGHTNING2.png";
import PLANNED_PUBLIC_DISORDER from "./images/PLANNED_PUBLIC_DISORDER2.png";
import PLANNED_GREEN_SPACES from "./images/PLANNED_GREEN_SPACES.png";
import PLANNED_PUBLIC_DOMAIN from "./images/PLANNED_PUBLIC_DOMAIN2.png";
import PLANNED_PUBLIC_TRANSPORT from "./images/PLANNED_PUBLIC_TRANSPORT.png";
import PLANNED_BUILDINGS from "./images/PLANNED_BUILDINGS.png";
import PLANNED_ROAD_SIGNS from "./images/PLANNED_ROAD_SIGNS2.png";
import PLANNED_ANIMALS from "./images/PLANNED_ANIMALS2.png";
import WORKING_ROAD from "./images/WORKING_ROAD.png";
import WORKING_LIGHTNING from "./images/WORKING_LIGHTNING.png";
import WORKING_PUBLIC_DISORDER from "./images/WORKING_PUBLIC_DISORDER.png";
import WORKING_GREEN_SPACES from "./images/WORKING_GREEN_SPACES.png";
import WORKING_PUBLIC_DOMAIN from "./images/WORKING_PUBLIC_DOMAIN.png";
import WORKING_PUBLIC_TRANSPORT from "./images/WORKING_PUBLIC_TRANSPORT.png";
import WORKING_BUILDINGS from "./images/WORKING_BUILDINGS.png";
import WORKING_ROAD_SIGNS from "./images/WORKING_ROAD_SIGNS.png";
import WORKING_ANIMALS from "./images/WORKING_ANIMALS.png";
import SOLVED_ROAD from "./images/SOLVED_ROAD2.png";
import SOLVED_LIGHTNING from "./images/SOLVED_LIGHTNING2.png";
import SOLVED_PUBLIC_DISORDER from "./images/SOLVED_PUBLIC_DISORDER2.png";
import SOLVED_GREEN_SPACES from "./images/SOLVED_GREEN_SPACES2.png";
import SOLVED_PUBLIC_DOMAIN from "./images/SOLVED_PUBLIC_DOMAIN2.png";
import SOLVED_PUBLIC_TRANSPORT from "./images/SOLVED_PUBLIC_TRANSPORT2.png";
import SOLVED_BUILDINGS from "./images/SOLVED_BUILDINGS2.png";
import SOLVED_ROAD_SIGNS from "./images/SOLVED_ROAD_SIGNS2.png";
import SOLVED_ANIMALS from "./images/SOLVED_ANIMALS2.png";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import build from "./images/build.png";
import solved from "./images/solved.png";
import planned from "./images/time.png";
import Legend from "../components/map/Legend";
import AddMapIssue from "../map-components/AddMapIssue";
import {createIcon} from "../common/geo-converter";
import DraggableMarker from "../map-components/DraggableMarker";
import {filterIssues} from "../api/issue-api";
import {useEffect} from "react";
import {Button} from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {
    cityBoundary,
    cityBoundary2,
    computeDateForPopup, computeDescriptionForPopup, convertAPIStatesToUI,
    convertAPITypesToUI,
    test,
    test2,
    testTm
} from "../common/utils";
import {simplify} from '@turf/turf';
import CategoryIcon from '@mui/icons-material/Category';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import NavigationIcon from '@mui/icons-material/Navigation';
import {Input} from "reactstrap";
import {LatLng, LatLngBounds} from "leaflet";
import leafletPip from 'leaflet-pip';
import {Navigate} from "react-router-dom";

const buildIcon = createIcon(build, false);
// const plannedIcon = createIcon(planned, false);
// const redirectedIcon = createIcon(redirected, false);
// const solvedIcon = createIcon(solved, false);

// const polygonCoordinates = [[47.0357540, 21.8959981], [47.0701130, 21.9360878], [47.0549163, 21.9285231],
//     [46.8340892, 22.1795680], [46.8349951, 22.1684311], [46.8334192, 22.1771494], [47.0581685, 21.9323901]];
const polygonCoordinates = [new LatLng(47.06269, 21.85967),
    new LatLng(47.07898, 21.85950),
    new LatLng(47.09074, 21.85823),
    new LatLng(47.10329, 21.88393),
    new LatLng(47.10160, 21.92468),
    new LatLng(47.09813, 21.95155),
    new LatLng(47.07634, 21.97488),
    new LatLng(47.05021, 21.98871),
    new LatLng(47.02548, 21.99588),
    new LatLng(47.01667, 21.91298),
    new LatLng(47.01837, 21.87356),
    new LatLng(47.02844, 21.85749),
    new LatLng(47.04657, 21.84707)
];

// const position = {lat: 47.059390150750204, lng: 21.912248426593525};
const position = {lat: 47.05292, lng: 21.91375}

//
// http://overpass-turbo.eu/
//

const IssueMapOSM = ({
                         passBackgroundCol,
                         passIsIssueAdded,
                         passSetIsIssuesAdded,
                         passIsIssueDeleted,
                         passIsIssueUpdated
                     }) => {
        const [forbidden, setForbidden] = useState(false);
        const [issues, setIssues] = useState([]);

        const [markerPosition, setMarkerPosition] = useState(position);
        const isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";

        const token = localStorage.getItem("token");
        const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

        // let plusIcon = createIcon(REGISTERED_ROAD, false);

        const filterAlIssues = () => {
            return filterIssues(
                token,
                null,
                null,
                null,
                null,
                true,
                null,
                1000,
                null,
                null,
                (result, status, err) => {
                    if (result !== null && status === 200) {
                        console.log(result.content);
                        setIssues(result.content);
                    } else {
                        console.log(err);
                    }
                }
            );
        };

        const getMarkerImage = (type, state) => {
            if (state === "REGISTERED") {
                switch (type) {
                    case "ROAD":
                        return createIcon(REGISTERED_ROAD, false);
                    case "LIGHTNING":
                        return createIcon(REGISTERED_LIGHTNING, false);
                    case "PUBLIC_DISORDER":
                        return createIcon(REGISTERED_PUBLIC_DISORDER, false);
                    case "PUBLIC_DOMAIN":
                        return createIcon(REGISTERED_PUBLIC_DOMAIN, false);
                    case "GREEN_SPACES":
                        return createIcon(REGISTERED_GREEN_SPACES, false);
                    case "BUILDINGS":
                        return createIcon(REGISTERED_BUILDINGS, false);
                    case "PUBLIC_TRANSPORT":
                        return createIcon(REGISTERED_PUBLIC_TRANSPORT, false);
                    case "TRAFFIC_ROAD_SIGNS":
                        return createIcon(REGISTERED_ROAD_SIGNS, false);
                    case "ANIMALS":
                        return createIcon(REGISTERED_ANIMALS, false);
                }
            } else if (state === "PLANNED") {
                switch (type) {
                    case "ROAD":
                        return createIcon(PLANNED_ROAD, false);
                    case "LIGHTNING":
                        return createIcon(PLANNED_LIGHTNING, false);
                    case "PUBLIC_DISORDER":
                        return createIcon(PLANNED_PUBLIC_DISORDER, false);
                    case "PUBLIC_DOMAIN":
                        return createIcon(PLANNED_PUBLIC_DOMAIN, false);
                    case "GREEN_SPACES":
                        return createIcon(PLANNED_GREEN_SPACES, false);
                    case "BUILDINGS":
                        return createIcon(PLANNED_BUILDINGS, false);
                    case "PUBLIC_TRANSPORT":
                        return createIcon(PLANNED_PUBLIC_TRANSPORT, false);
                    case "TRAFFIC_ROAD_SIGNS":
                        return createIcon(PLANNED_ROAD_SIGNS, false);
                    case "ANIMALS":
                        return createIcon(PLANNED_ANIMALS, false);
                }
            } else if (state === "WORKING") {
                switch (type) {
                    case "ROAD":
                        return createIcon(WORKING_ROAD, false, true);
                    case "LIGHTNING":
                        return createIcon(WORKING_LIGHTNING, false, true);
                    case "PUBLIC_DISORDER":
                        return createIcon(WORKING_PUBLIC_DISORDER, false, true);
                    case "PUBLIC_DOMAIN":
                        return createIcon(WORKING_PUBLIC_DOMAIN, false, true);
                    case "GREEN_SPACES":
                        return createIcon(WORKING_GREEN_SPACES, false, true);
                    case "BUILDINGS":
                        return createIcon(WORKING_BUILDINGS, false, true);
                    case "PUBLIC_TRANSPORT":
                        return createIcon(WORKING_PUBLIC_TRANSPORT, false, true);
                    case "TRAFFIC_ROAD_SIGNS":
                        return createIcon(WORKING_ROAD_SIGNS, false, true);
                    case "ANIMALS":
                        return createIcon(WORKING_ANIMALS, false, true);
                }
            } else if (state === "REDIRECTED") {
                switch (type) {
                    case "ROAD":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "LIGHTNING":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "PUBLIC_DISORDER":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "PUBLIC_DOMAIN":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "GREEN_SPACES":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "BUILDINGS":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "PUBLIC_TRANSPORT":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "TRAFFIC_ROAD_SIGNS":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "ANIMALS":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                }
            } else if (state === "SOLVED") {
                switch (type) {
                    case "ROAD":
                        return createIcon(SOLVED_ROAD, false);
                    case "LIGHTNING":
                        return createIcon(SOLVED_LIGHTNING, false);
                    case "PUBLIC_DISORDER":
                        return createIcon(SOLVED_PUBLIC_DISORDER, false);
                    case "PUBLIC_DOMAIN":
                        return createIcon(SOLVED_PUBLIC_DOMAIN, false);
                    case "GREEN_SPACES":
                        return createIcon(SOLVED_GREEN_SPACES, false);
                    case "BUILDINGS":
                        return createIcon(SOLVED_BUILDINGS, false);
                    case "PUBLIC_TRANSPORT":
                        return createIcon(SOLVED_PUBLIC_TRANSPORT, false);
                    case "TRAFFIC_ROAD_SIGNS":
                        return createIcon(SOLVED_ROAD_SIGNS, false);
                    case "ANIMALS":
                        return createIcon(SOLVED_ANIMALS, false);
                }
            }
            return null;
        }

        const url = passBackgroundCol == 'white' ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' :
            'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';

        useEffect(() => {
            filterAlIssues();
        }, [passIsIssueAdded, passIsIssueDeleted, passIsIssueUpdated]);

        const oradeaBounds = new LatLngBounds(
            new LatLng(47.06269, 21.85967),
            new LatLng(47.07898, 21.85950),
            new LatLng(47.09074, 21.85823),
            new LatLng(47.10329, 21.88393),
            new LatLng(47.10160, 21.92468),
            new LatLng(47.09813, 21.95155),
            new LatLng(47.07634, 21.97488),
            new LatLng(47.05021, 21.98871),
            new LatLng(47.02548, 21.99588),
            new LatLng(47.01667, 21.91298),
            new LatLng(47.01837, 21.87356),
            new LatLng(47.02844, 21.85749),
            new LatLng(47.04657, 21.84707)
        );

        return (
            <div>
                {!isBlocked ?
                    <div>
                        <MapContainer
                            center={position}
                            zoom={13}
                            className={classes.wrapper}
                            minZoom={12}
                            // bounds={oradeaBounds}
                            // maxBounds={oradeaBounds}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={url}
                                // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                // url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                                // url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                                opacity={1}
                            />
                            <Polygon pathOptions={{color: 'blue'}} positions={polygonCoordinates}/>
                            {issues &&
                                issues.map((issue) => {
                                        const icon = getMarkerImage(issue.type, issue.state);
                                        return <Marker position={issue.address} icon={icon}
                                                       key={issue.id}>
                                            <Popup>
                                                <div>
                                                    <CategoryIcon style={{marginRight: "8px"}}/>
                                                    {convertAPITypesToUI(issue.type)}
                                                </div>
                                                <div>
                                                    <NavigationIcon style={{marginRight: "8px"}}/>
                                                    {convertAPIStatesToUI(issue.state)}
                                                </div>
                                                <div>
                                                    <AddLocationAltIcon style={{marginRight: "8px"}}/>
                                                    {computeDateForPopup(issue.reportedDate)}
                                                </div>
                                                <div>
                                                    <DescriptionIcon style={{marginRight: "8px"}}/>
                                                    {computeDescriptionForPopup(issue.description)}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    }
                                )})
                            {!isAdmin &&
                                <DraggableMarker passMarkerPosition={setMarkerPosition}
                                                 polygonCoordinates={polygonCoordinates}/>}
                        </MapContainer>
                        <Legend passFilteredIssues={setIssues} passBackgroundCol={passBackgroundCol}/>
                        {!isAdmin && <AddMapIssue passIsIssueAdded={passSetIsIssuesAdded} markerPosition={markerPosition}/>}
                    </div> : <Navigate to={"/blocked"} replace/>
                }
            </div>
        );
    }
;

export default IssueMapOSM;
