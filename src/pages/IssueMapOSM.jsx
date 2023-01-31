import React, {useState} from "react";
import {
    Marker,
    MapContainer,
    TileLayer,
    Popup,
    useMapEvents,
} from "react-leaflet";
import classes from "./IssueMapOSM.module.css";
import plus from "./images/plus.png";
import build from "./images/build.png";
import redirected from "./images/arrow-r.png";
import solved from "./images/solved.png";
import planned from "./images/time.png";
import Legend from "../components/map/Legend";
import AddMapIssue from "../map-components/AddMapIssue";
import {createIcon} from "../common/geo-converter";
import DraggableMarker from "../map-components/DraggableMarker";
import {getIssues} from "../api/issue-api";
import {useEffect} from "react";
import {Button} from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const position = {lat: 47.059390150750204, lng: 21.912248426593525};
const plusIcon = createIcon(plus, false);
const buildIcon = createIcon(build, false);
const plannedIcon = createIcon(planned, false);
const redirectedIcon = createIcon(redirected, false);
const solvedIcon = createIcon(solved, false);

const IssueMapOSM = () => {
    const [forbidden, setForbidden] = useState(false);
    const [issues, setIssues] = useState([]);
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [isIssueAdded, setIsIssueAdded] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(position);

    const getAllIssues = () => {
        return getIssues("true", (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setIssues(result);
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    };

    useEffect(() => {
        getAllIssues();
    }, [isIssueAdded]);

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
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // url="https://api.maptiler.com/maps/nl-cartiqo-dark/{z}/{x}/{y}.png?key=MvBQzECTHjLKx0u1unDW" ~~~~~~~~~~~~~~~nu merge ~~~~~~~~~~
                    // attribution="https://api.maptiler.com/maps/nl-cartiqo-dark/tiles.json?key=MvBQzECTHjLKx0u1unDW"
                />
                {issues &&
                    issues.map((device) => (
                        <Marker position={device.address} icon={plusIcon} key={device.id}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
                            </Popup>
                        </Marker>
                    ))}
                <DraggableMarker passMarkerPosition={setMarkerPosition}/>
            </MapContainer>
            <Button
                style={{zIndex: 900, margin: "1rem 3rem"}}
                startIcon={<ManageSearchIcon style={{ color: "red" }} />}
                variant="contained"
                onClick={() => {
                    setOpenFilterModal(true);
                }}
            >
                Filtrează sesizările
            </Button>
            {/* {openFilterModal && (
              <FilterMapModal
                open={openFilterModal}
                func={addNewUser}
                onClose={() => setOpenAddModal(false)}
              />
            )} */}
            <Legend/>
            <AddMapIssue passIsIssueAdded={setIsIssueAdded} markerPosition={markerPosition}/>
        </div>
    );
};

export default IssueMapOSM;
