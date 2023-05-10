import Modal from "react-bootstrap/Modal";
import BasicChart from "../../chart/BasicChart";
import Button from "@mui/material/Button";
import React, {useEffect, useRef, useState} from "react";
import {getFirstImage, getSecondImage, getThirdImage} from "../../api/issue-image-api";
import noPhoto from "../../pages/images/no_photo.png";
import classes from "./IssueModal.module.css"
import {Input} from "reactstrap";
import {CategoryData} from "../../staticdata/CategoryData";
import {StateData} from "../../staticdata/StateData";
import {computeDateForPopup, convertAPIStatesToUI, convertAPITypesToUI} from "../../common/utils";

const IssueModal = ({show, issue, onHide, passBackgroundColor}) => {
    const [mainImage, setMainImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [thirdImage, setThirdImage] = useState(null);
    const [forbidden, setForbidden] = useState(null);
    const typeInputRef = useRef();
    const stateInputRef = useRef();
    const type = convertAPITypesToUI(issue.type);
    const state = convertAPIStatesToUI(issue.state);

    const token = localStorage.getItem("token");
    const lat = issue.address.lat;
    const lng = issue.address.lng;
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}&zoom=${13}`
    const [height, setHeight] = useState(window.innerHeight);
    console.log(height)

    const getMainIssueImage = () => {
        return getFirstImage(token, issue.id, (result, status, err) => {
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
        return getSecondImage(token, issue.id, (result, status, err) => {
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
        return getThirdImage(token, issue.id, (result, status, err) => {
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

    useEffect(() => {
        getMainIssueImage();
        getSecondIssueImage();
        getThirdIssueImage();
    }, [issue])

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{backgroundColor: passBackgroundColor}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editați sesizarea
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: passBackgroundColor, maxHeight: 520, width: "100%", overflowY: 'auto'}}>
                <img src={mainImage} style={{width: "100%"}} className={classes.imageContainer} alt=""/>
                <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}>
                    <img src={secondImage} style={{width: "49%"}} className={classes.imageContainer} alt=""/>
                    <img src={thirdImage} style={{width: "49%"}} className={classes.imageContainer} alt=""/>
                </div>
                <br/>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: "49%"}}>
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
                        <br/>
                        Adresa: {issue.actualLocation}
                        <br/>
                        Data: {computeDateForPopup(issue.reportedDate)}
                        <br/>
                        Raportată de: {issue.citizenEmail} (pot pune aici buton de Block)
                    </div>
                    <div style={{width: "49%"}}>
                        {issue.hasLocation && <iframe style={{width: "100%", height: "100%"}} title="Map"
                                                      src={mapUrl}></iframe>}
                    </div>
                </div>
                <br/>
                {/*Descriere: {issue.description}*/}
                <Input style={{resize: "none"}}
                       id="description"
                       name="description"
                       type="textarea"
                       value={issue.description}
                       disabled
                />
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: passBackgroundColor}}>
                <Button variant="contained"
                        color="error"
                        className={classes.cancelButton}
                        onClick={onHide}>Închide
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default IssueModal;