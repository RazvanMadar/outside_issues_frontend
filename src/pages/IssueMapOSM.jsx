import React, {useState} from "react";
import {Marker, MapContainer, TileLayer, Popup, Polygon} from "react-leaflet";
import classes from "./IssueMapOSM.module.css";
import plus from "./images/plus.png";
import REGISTERED_ROAD from "./images/REGISTERED_ROAD.png";
import REGISTERED_LIGHTNING from "./images/REGISTERED_LIGHTNING.png";
import REGISTERED_PUBLIC_DISORDER from "./images/REGISTERED_PUBLIC_DISORDER.png";
import SOLVED_PUBLIC_DISORDER from "./images/SOLVED_PUBLIC_DISORDER.png";
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
import {cityBoundary, cityBoundary2, test, test2, testTm} from "../common/utils";
import {simplify} from '@turf/turf';

const position = {lat: 47.059390150750204, lng: 21.912248426593525};
const buildIcon = createIcon(build, false);
// const plannedIcon = createIcon(planned, false);
// const redirectedIcon = createIcon(redirected, false);
// const solvedIcon = createIcon(solved, false);
const polygonCoordinates = [[47.0357540, 21.8959981], [47.0701130, 21.9360878], [47.0549163, 21.9285231],
    [46.8340892, 22.1795680], [46.8349951, 22.1684311], [46.8334192, 22.1771494], [47.0581685, 21.9323901]];

//
// http://overpass-turbo.eu/
//

const IssueMapOSM = ({passBackgroundCol, passIsIssueAdded, passSetIsIssuesAdded}) => {
    const [forbidden, setForbidden] = useState(false);
    const [issues, setIssues] = useState([]);
    const [openFilterModal, setOpenFilterModal] = useState(false);

    // const [isIssueAdded, setIsIssueAdded] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(position);

    // let plusIcon = createIcon(REGISTERED_ROAD, false);

    const filterAlIssues = () => {
        return filterIssues(
            null,
            null,
            null,
            null,
            true,
            null,
            null,
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
    console.log(passBackgroundCol);
    const getMarkerImage = (type, state) => {
        if (state === "REGISTERED") {
            switch (type) {
                case "ROAD": return createIcon(REGISTERED_ROAD, false);
                case "LIGHTNING": return createIcon(REGISTERED_LIGHTNING, false);
                case "PUBLIC_DISORDER": return createIcon(REGISTERED_PUBLIC_DISORDER, false);
                case "PUBLIC_DOMAIN": return createIcon(REGISTERED_PUBLIC_DISORDER, false);
                case "GREEN_SPACES": return createIcon(REGISTERED_PUBLIC_DISORDER, false);
                case "BUILDINGS": return createIcon(REGISTERED_PUBLIC_DISORDER, false);
                case "PUBLIC_TRANSPORT": return createIcon(REGISTERED_PUBLIC_DISORDER, false);
                case "TRAFFIC_ROAD_SIGNS": return createIcon(REGISTERED_PUBLIC_DISORDER, false);
                case "ANIMALS": return createIcon(REGISTERED_PUBLIC_DISORDER, false);
            }
        }
        else if (state === "PLANNED") {
            switch (type) {
                case "ROAD": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "LIGHTNING": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DOMAIN": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "GREEN_SPACES": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "BUILDINGS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_TRANSPORT": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "TRAFFIC_ROAD_SIGNS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
            }
        }
        else if (state === "WORKING") {
            switch (type) {
                case "ROAD": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "LIGHTNING": return createIcon(REGISTERED_LIGHTNING, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DOMAIN": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "GREEN_SPACES": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "BUILDINGS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_TRANSPORT": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "TRAFFIC_ROAD_SIGNS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
            }
        }
        else if (state === "REDIRECTED") {
            switch (type) {
                case "ROAD": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "LIGHTNING": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DOMAIN": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "GREEN_SPACES": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "BUILDINGS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_TRANSPORT": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "TRAFFIC_ROAD_SIGNS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
            }
        }
        else if (state === "SOLVED") {
            switch (type) {
                case "ROAD": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "LIGHTNING": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DOMAIN": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "GREEN_SPACES": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "BUILDINGS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_TRANSPORT": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "TRAFFIC_ROAD_SIGNS": return createIcon(SOLVED_PUBLIC_DISORDER, false);
                case "PUBLIC_DISORDER": return createIcon(SOLVED_PUBLIC_DISORDER, false);
            }
        }
        return null;
    }

    const url = passBackgroundCol == 'white' ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' :
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';

    useEffect(() => {
        filterAlIssues();
    }, [passIsIssueAdded]);

    return (
        <div>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className={classes.wrapper}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={url}
                    // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    // url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                    // url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    opacity={1}
                />
                {/*<Polygon color='purple" positions={test}/>*/}
                {issues &&
                    issues.map((issue) => {
                            const icon = getMarkerImage(issue.type, issue.state);
                            return <Marker position={issue.address} icon={icon}
                                           key={issue.id}>
                                <Popup>
                                    {issue.type}
                                    <br/> Easily customizable.
                                </Popup>
                            </Marker>
                        }
                    )})}
                <DraggableMarker passMarkerPosition={setMarkerPosition}/>
            </MapContainer>
            <Legend passFilteredIssues={setIssues}/>
            <AddMapIssue passIsIssueAdded={passSetIsIssuesAdded} markerPosition={markerPosition}/>
        </div>
    );
};

export default IssueMapOSM;
