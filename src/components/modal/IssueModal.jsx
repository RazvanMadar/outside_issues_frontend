import Button from "@mui/material/Button";
import React, {useEffect, useRef, useState} from "react";
import {getFirstImage, getSecondImage, getThirdImage} from "../../api/issue-image-api";
import noPhoto from "../../pages/images/no_photo.png";
import classes from "./IssueModal.module.css"
import {Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {CategoryData} from "../../staticdata/CategoryData";
import {StateData} from "../../staticdata/StateData";
import {
    computeDateForPopup,
    convertAPIStatesToUI,
    convertAPITypesToUI,
    convertUIStatesToAPI,
    convertUITypesToAPI
} from "../../common/utils";
import {updateIssue} from "../../api/issue-api";
import {sendEmail} from "../../api/email-api";

const IssueModal = ({show, issue, onHide, passBackgroundColor, passIsUpdated}) => {
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

    const updateAnIssue = () => {
        const enteredType = convertUITypesToAPI(typeInputRef.current.value);
        const enteredState = convertUIStatesToAPI(stateInputRef.current.value);
        return updateIssue(token, issue.id, enteredType, enteredState, (result, status, err) => {
            if (result !== null && status === 200) {
                passIsUpdated((prev) => !prev)
                if (issue.citizenEmail !== null && (issue.state !== enteredState || issue.type !== enteredType)) {
                    let content = `Sesizarea cu numărul ${issue.id}, făcută de dumneavoastră, de tipul ${convertAPITypesToUI(issue.type)} (${issue.actualLocation}) a fost modificată.`;
                    if (enteredType !== undefined && issue.type !== enteredType) {
                        content += `\nTipul a fost schimbat în: ${typeInputRef.current.value}`;
                    }
                    if (enteredState !== undefined && issue.state !== enteredState) {
                        content += `\nStarea a fost trecută în: ${stateInputRef.current.value}`;
                    }
                    sendAnEmail({
                        subject: "Sesizare Primăria Oradea",
                        toEmail: issue.citizenEmail,
                        content: content,
                        issueId: issue.id
                    });
                }
                onHide();
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    }

    const sendAnEmail = (data) => {
        return sendEmail(token, data, (result, status, err) => {
            if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        })
    }

    useEffect(() => {
        getMainIssueImage();
        getSecondIssueImage();
        getThirdIssueImage();
    }, [issue])

    return (
        <Modal
            isOpen={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader style={{backgroundColor: passBackgroundColor}}>
                Editați sesizarea
            </ModalHeader>
            <ModalBody
                style={{backgroundColor: passBackgroundColor, maxHeight: 520, width: "100%", overflowY: 'auto'}}>
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
                                    return <option key={cat.id} style={{maxWidth: "1rem"}}>{cat.title}</option>
                            })}
                        </Input>
                        Starea sesizării
                        <Input type="select" name="state" id="category" innerRef={stateInputRef}>
                            <option value="">{state}</option>
                            {StateData.map((st) => {
                                if (st.id > 1 && st.title !== state)
                                    return <option key={st.id} style={{maxWidth: "1rem"}}>{st.title}</option>
                            })}
                        </Input>
                        <br/>
                        Adresa: {issue.actualLocation}
                        <br/>
                        Data: {computeDateForPopup(issue.reportedDate)}
                        <br/>
                        Raportat de: {issue.citizenEmail !== null ? issue.citizenEmail : "Senzorii platformei"}
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
            </ModalBody>
            <ModalFooter
                style={{backgroundColor: passBackgroundColor, display: "flex", justifyContent: "space-between"}}>
                <Button variant="contained"
                        color="primary"
                        className={classes.filterButton}
                        onClick={updateAnIssue}
                >Actualizează
                </Button>
                <Button variant="contained"
                        color="error"
                        className={classes.cancelButton}
                        onClick={onHide}>Închide
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default IssueModal;