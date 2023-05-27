import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Polygon, Popup, TileLayer} from "react-leaflet";
import classes from "./IssueMapOSM.module.css";
import Legend from "../components/map/Legend";
import AddMapIssue from "../components/map/AddMapIssue";
import DraggableMarker from "../components/map/DraggableMarker";
import {filterIssues} from "../api/issue-api";
import {
    computeDateForPopup,
    computeDescriptionForPopup,
    convertAPIStatesToUI,
    convertAPITypesToUI,
    getMarkerImage
} from "../common/utils";
import CategoryIcon from '@mui/icons-material/Category';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import NavigationIcon from '@mui/icons-material/Navigation';
import {LatLng} from "leaflet";
import {Navigate} from "react-router-dom";

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

const position = {lat: 47.05292, lng: 21.91375}

//
// http://overpass-turbo.eu/
//

const IssueMapOSM = ({passBackgroundCol, passIsIssueAdded, passSetIsIssuesAdded, passIsIssueDeleted, passIsIssueUpdated}) => {
        const [issues, setIssues] = useState([]);
        const [markerPosition, setMarkerPosition] = useState(position);
        const isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";
        const token = localStorage.getItem("token");
        const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

        const filterAlIssues = () => {
            return filterIssues(token, null, null, null, null, true, false,
                null, 1000, null, null, (result, status, err) => {
                    if (result !== null && status === 200) {
                        console.log(result.content);
                        setIssues(result.content);
                    }
                }
            );
        };

        const url = passBackgroundCol == 'white' ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' :
            'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';

        useEffect(() => {
            filterAlIssues();
        }, [passIsIssueAdded, passIsIssueDeleted, passIsIssueUpdated]);

        return (
            <div style={{paddingTop: "55px"}}>
                {!isBlocked ?
                    <div>
                        <MapContainer
                            center={position}
                            zoom={13}
                            className={classes.wrapper}
                            minZoom={12}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={url}
                                opacity={1}
                            />
                            <Polygon pathOptions={{color: 'grey'}} positions={polygonCoordinates}/>
                            {issues &&
                                issues.map((issue) => {
                                        const icon = getMarkerImage(issue.type, issue.state);
                                        return <Marker position={issue.address} icon={icon} key={issue.id}>
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
