import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {findIssueById, updateIssue} from "../api/issue-api";
import {getFirstImage, getSecondImage, getThirdImage} from "../api/issue-image-api";
import noPhoto from "./images/no_photo.png";
import classes from "./IssueDetails.module.css";
import {Input} from "reactstrap";
import {CategoryData} from "../staticdata/CategoryData";
import {StateData} from "../staticdata/StateData";
import {convertAPIStatesToUI, convertAPITypesToUI, convertUIStatesToAPI, convertUITypesToAPI} from "../common/utils";
import Button from "@mui/material/Button";
import {findCitizenByEmail, findCitizenById} from "../api/citizen-api";

const IssueDetails = () => {
    const {id} = useParams();
    const [issue, setIssue] = useState(null);
    const [citizen, setCitizen] = useState(null);
    const [state, setState] = useState(null);
    const [type, setType] = useState(null);
    const [reportedDate, setReportedDate] = useState(null);
    const typeInputRef = useRef();
    const stateInputRef = useRef();
    const [issueNotFound, setIssueNotFound] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [thirdImage, setThirdImage] = useState(null);
    const [forbidden, setForbidden] = useState(null);
    const zoom = 10;
    const width = 450;
    const height = 480;
    const [mapUrl, setMapUrl] = useState('');

    const navigate = useNavigate();

    const findAnIssueById = (id) => {
        return findIssueById(id, (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log(result);
                    findAnCitizenByEmail(result.citizenEmail);
                    if (result.hasLocation) {
                        const lat = result.address.lat;
                        const lng = result.address.lng;
                        setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}&zoom=${zoom}`);
                    }
                    setState(convertAPIStatesToUI(result.state));
                    setType(convertAPITypesToUI(result.type));
                    setIssue(result);
                    getMainIssueImage();
                    getSecondIssueImage();
                    getThirdIssueImage();
                } else {
                    console.log(err);
                    setIssueNotFound(true);
                }
            }
        );
    };

    const findAnCitizenByEmail = (email) => {
        return findCitizenByEmail(email, (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log(result);
                    setCitizen(result);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const getMainIssueImage = () => {
        return getFirstImage(id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setMainImage(URL.createObjectURL(result));
            } else if (status === 403) {
                setForbidden(true);
            } else {
                setMainImage(noPhoto);
            }
        });
    };

    const getSecondIssueImage = () => {
        return getSecondImage(id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setSecondImage(URL.createObjectURL(result));
            } else if (status === 403) {
                setForbidden(true);
            } else {
                setSecondImage(noPhoto);
            }
        });
    };

    const getThirdIssueImage = () => {
        return getThirdImage(id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setThirdImage(URL.createObjectURL(result));
            } else if (status === 403) {
                setForbidden(true);
            } else {
                setThirdImage(noPhoto);
            }
        });
    };

    const updateAnIssue = () => {
        const enteredType = convertUITypesToAPI(typeInputRef.current.value);
        const enteredState = convertUIStatesToAPI(stateInputRef.current.value);
        return updateIssue(id, enteredType, enteredState, (result, status, err) => {
            if (result !== null && status === 200) {
                navigate("/issues");
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    }

    const closeUpdatePage = () => {
        navigate("/issues");
    }

    useEffect(() => {
        findAnIssueById(id);
    }, [id]);

    //
    // NU E RESPONSIVE -> MEDIA QUERY PE HEIGHT / WIDTH IN CSS
    //
    return (
        <div>
            {issue ?
                <div className={classes.main}>
                    <div>
                        {/*<p>Sesizarea cu numărul {id}</p>*/}
                        <div>
                            <img alt="" className={classes.mainImage}
                                 src={mainImage}/>
                            <img alt="" className={classes.secondImage}
                                 src={secondImage}/>
                            <img alt="" className={classes.thirdImage}
                                 src={thirdImage}/>
                        </div>
                        <div className={classes.details}>
                            Tipul sesizării
                            <Input type="select" name="category" id="category" innerRef={typeInputRef}>
                                <option value="">{type}</option>
                                {CategoryData.map((cat) => {
                                    if (cat.id > 1 && cat.title !== type)
                                        return <option style={{maxWidth: "1rem"}}>{cat.title}</option>
                                })}
                            </Input>
                            Starea sesizării
                            <Input type="select" name="state" id="category" innerRef={stateInputRef}>
                                <option value="">{state}</option>
                                {StateData.map((st) => {
                                    if (st.id > 1 && st.title !== state)
                                        return <option style={{maxWidth: "1rem"}}>{st.title}</option>
                                })}
                            </Input>
                            Adresa sesizării: {issue.actualLocation}
                            <br/>
                            Data raportării: {issue.reportedDate}
                            <br/>
                            Descriere: {issue.description}
                            <br/>
                            Raportată de cetățeanul: {citizen ? citizen.email : "Anonim"} (pot pune aici buton de Block)
                            <br/>
                            <br/>
                        </div>
                        {issue.hasLocation && <div className={classes.map}>
                            <iframe
                                title="Map"
                                width={width}
                                height={height}
                                src={mapUrl}
                            ></iframe>
                        </div>}
                        <div className={classes.buttons}>
                            <Button variant="contained"
                                    color="success"
                                // className={classes.filterButton}
                                    onClick={updateAnIssue}
                            >Actualizează
                            </Button>
                            <Button variant="contained"
                                    color="error"
                                    onClick={closeUpdatePage}
                            >
                                Anulează
                            </Button>
                        </div>
                    </div>
                </div>
                : ""
            }
            {issueNotFound && <p>Nu exista nicio sesizare cu id-ul {id}</p>}
        </div>
    );
}

export default IssueDetails;