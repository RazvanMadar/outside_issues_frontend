import React, {useEffect, useRef, useState} from "react";
import {Form, FormGroup, Input, Label, Row} from "reactstrap";
import Button from "@mui/material/Button";
import {addIssue} from "../api/issue-api";
import ImageBox from "./ImageBox";
import classes from "./AddForm.module.css";
import {CategoryData} from "../staticdata/CategoryData";
import {addImage} from "../api/issue-image-api";
import Checkbox from '@mui/material/Checkbox';
import {convertUITypesToAPI, getCurrentDate} from "../common/utils";
import {getAddressFromCoordinates, getAddressFromCoordinatesAxios} from "../api/address-api";

const AddForm = ({passIsShown, passIsIssueAdded, markerPosition}) => {
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const [forbidden, setForbidden] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [issueAdr, setIssueAdr] = useState('');
    const [photos, setPhotos] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const checkbox = useRef(null);

    const addAnIssue = (issue) => {
        console.log(issue);
        return addIssue(issue, (result, status, err) => {
            if (result !== null && status === 201) {
                console.log(result);
                setAuthorized(true);
                passIsIssueAdded((prev) => !prev);
                addAnImage(result);
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    };

    const getNumberFromIndex = (index) => {
        if (index === 0)
            return "FIRST";
        if (index === 1)
            return "SECOND";
        return "THIRD";
    }

    const addAnImage = (id) => {
        photos.map((img, index) => {
            return addImage(id, img, getNumberFromIndex(index), (result, status, err) => {
                if (result !== null && status === 201) {
                    console.log(result);
                    setAuthorized(true);
                } else if (status === 403) {
                    setForbidden(true);
                } else {
                    console.log(err);
                }
            })
        });
    };

    const checkIfLocation = () => {
        return checkbox.current.checked ? markerPosition : {lat: null, lng: null};
    }

    // const checkIfLocation = () => {
    //     let latitude, longitude, address;
    //     if (checkbox.current.checked) {
    //         latitude = markerPosition.lat;
    //         longitude = markerPosition.lng;
    //         address = computeAddressFromCoordinates(latitude, longitude);
    //     } else {
    //         latitude = null;
    //         longitude = null;
    //         address = "Fără adresă";
    //     }
    //     console.log(address)
    //     return {lat: latitude, lng: longitude, adr: address};
    // }

    const computeAddressFromCoordinates = (address) => {
        setIssueAdr("Fără adresă");
        return getAddressFromCoordinates(address, (result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                console.log(result);
                let issueAddress = result.address.road;
                if (result.address.house_number != null) {
                    issueAddress += ", " + result.address.house_number;
                }
                if (result.address.suburb != null) {
                    issueAddress += ", " + result.address.suburb;
                }
                setIssueAdr(issueAddress);
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    }

    const hasLocation = () => {
        return !!checkbox.current.checked;
    }

    useEffect(() => {
        computeAddressFromCoordinates(checkIfLocation());
        console.log("intra useeffect");
    }, [passIsShown, isChecked])

    return (
        <div className={classes.wrapper}>
            <Form>
                <Row>
                    <ImageBox passIsPhoto={setPhotos}/>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="category">Categorie</Label>
                        <Input type="select" name="category" id="category" innerRef={categoryInputRef}
                               placeholder="road">
                            {/*<option selected disabled hidden>Drumuri</option>*/}
                            {CategoryData.map((cat) => {
                                if (cat.id > 1)
                                    return <option style={{maxWidth: "1rem"}}>{cat.title}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="description">Descriere</Label>
                        <Input style={{resize: "none"}}
                               id="description"
                               name="description"
                               type="textarea"
                               innerRef={descriptionInputRef}
                               placeholder="Scrie o descriere..."
                        />
                        <span>Folosește locația pentru sesizare</span>
                        <Checkbox defaultChecked color="success" inputRef={checkbox} onClick={() => setIsChecked(checkbox.current.checked)}/>
                    </FormGroup>
                </Row>
            </Form>
            <Button
                variant="contained"
                color="success"
                style={{position: "absolute", left: "1rem", width: "8rem"}}
                onClick={() => {
                    passIsShown(false);
                    addAnIssue({
                        type: convertUITypesToAPI(categoryInputRef.current.value),
                        state: "REGISTERED",
                        reportedDate: getCurrentDate(),
                        description: descriptionInputRef.current.value,
                        likesNumber: 0,
                        dislikesNumber: 0,
                        address: checkIfLocation(),
                        hasLocation: hasLocation(),
                        actualLocation: issueAdr,
                        citizenId: 1
                    });
                }}
            >
                Adaugă
            </Button>
            <Button
                variant="contained"
                color="error"
                style={{position: "absolute", right: "1rem", width: "8rem"}}
                onClick={() => passIsShown(false)}
            >
                Anulează
            </Button>
        </div>
    );
};

export default AddForm;
