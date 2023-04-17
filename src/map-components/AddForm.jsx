import React, {useEffect, useRef, useState} from "react";
import {Form, FormGroup, Input, Label, Row} from "reactstrap";
import Button from "@mui/material/Button";
import {addIssue} from "../api/issue-api";
import ImageBox from "./ImageBox";
import classes from "./AddForm.module.css";
import {CategoryData} from "../staticdata/CategoryData";
import {addImage} from "../api/issue-image-api";
import Checkbox from '@mui/material/Checkbox';
import {convertAPITypesToUI, convertUITypesToAPI, getCurrentDate} from "../common/utils";
import {getAddressFromCoordinates, getAddressFromCoordinatesAxios} from "../api/address-api";
import * as FaIcons from "react-icons/fa";
import {Link} from "react-router-dom";
import {registerCitizen} from "../api/citizen-api";
import {sendEmail} from "../api/email-api";

const AddForm = ({passIsShown, passIsIssueAdded, markerPosition}) => {
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const emailInputRef = useRef();
    const phoneInputRef = useRef();
    const [forbidden, setForbidden] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [issueAdr, setIssueAdr] = useState('');
    const [photos, setPhotos] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const checkbox = useRef(null);
    const isLogged = localStorage.getItem("isLogged");
    const email = localStorage.getItem("email");
    const [currentMail, setCurrentMail] = useState(
        localStorage.getItem("email") ? localStorage.getItem("email") : "");

    const sendAnEmail = (data) => {
        return sendEmail(data, (result, status, err) => {
            if (result !== null && status === 200) {
                setAuthorized(true);
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        })
    }

    const addAnIssue = (issue) => {
        console.log(issue);
        return addIssue(issue, (result, status, err) => {
            if (result !== null && status === 201) {
                console.log(result);
                setAuthorized(true);
                passIsIssueAdded((prev) => !prev);
                addAnImage(result);
                const content = "Sesizarea făcută de dumneavoastră de tipul " + convertAPITypesToUI(issue.type) + " a fost înregistrată cu succes."
                    + "\nVă mulțumim pentru contribuția dumneavoastră la menținerea si dezvoltarea orașului!";
                // sendAnEmail({subject: "Sesizare Primăria Oradea", toEmail: currentMail, content: content, issueId: result});
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    };

    const registerAnCitizen = (citizen) => {
        console.log(citizen);
        return registerCitizen(citizen, (result, status, err) => {
                if (result !== null && status === 201) {
                    console.log(result);
                } else {
                    console.log(err);
                }
            }
        )
    }

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
                let issueAddress = "";
                let moreThanOneWord = false;
                if (result.address.road != null) {
                    issueAddress += result.address.road;
                    moreThanOneWord = true;
                }
                if (result.address.house_number != null) {
                    if (moreThanOneWord === true) {
                        issueAddress += ", "
                    }
                    issueAddress += result.address.house_number;
                    moreThanOneWord = true;
                }
                if (result.address.suburb != null) {
                    if (moreThanOneWord === true) {
                        issueAddress += ", "
                    }
                    issueAddress += result.address.suburb;
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

    const handleAddIssue = () => {
        passIsShown(false);
        const currentEmail = !isLogged ? emailInputRef.current.value : null
        if (!isLogged) {
            setCurrentMail(currentEmail);
            const currentPhone = phoneInputRef.current.value;
            const data = {
                email: currentEmail,
                phoneNumber: currentPhone.length > 0 ? currentPhone : null,
                firstName: null,
                lastName: null,
                password: null
            };
            registerAnCitizen(data);
        }

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
            citizenEmail: isLogged ? email : currentEmail
        });
    }

    useEffect(() => {
        computeAddressFromCoordinates(checkIfLocation());
    }, [passIsShown, isChecked])

    const formHeight = isLogged ? 480 : 610
    return (
        <div className={classes.wrapper} style={{height: formHeight}}>
            <Form>
                <Row>
                    <ImageBox passIsPhoto={setPhotos} title={"până la 3 imagini (max. 20MB)"} numberOfPhotos={3}/>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="category">Categorie</Label>
                        <Input type="select" name="category" id="category" innerRef={categoryInputRef}
                               placeholder="road">
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
                        <Checkbox defaultChecked color="success" inputRef={checkbox}
                                  onClick={() => setIsChecked(checkbox.current.checked)}/>
                    </FormGroup>
                </Row>
                {!isLogged ? <Row>
                    <FormGroup>
                        <Input type="email" name="email" id="email" innerRef={emailInputRef}
                               placeholder="Email">
                        </Input>
                        <Input type="text" name="email" id="email" innerRef={phoneInputRef}
                               placeholder="Telefon (opțional...)" style={{marginTop: "5px", marginBottom: "5px"}}>
                        </Input>
                        <Link to="/login" style={{textDecoration: "none", color: "orange"}}>
                            Ai deja cont? Autentifică-te aici
                        </Link>
                    </FormGroup>
                </Row> : ""}
            </Form>
            <Button
                variant="contained"
                color="success"
                style={{position: "absolute", left: "1rem", width: "8rem"}}
                onClick={handleAddIssue}
                // onClick={() => sendAnEmail({
                //     subject: "Sesizare Primăria Oradea",
                //     toEmail: 'razvanmadar@gmail.com',
                //     content: "muie steaua",
                //     issueId: 11
                // })}
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
