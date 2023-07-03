import React, {useEffect, useRef, useState} from "react";
import {Form, FormGroup, Input, Label, Row} from "reactstrap";
import Button from "@mui/material/Button";
import {addIssue} from "../../api/issue-api";
import ImageBox from "../imagebox/ImageBox";
import classes from "./AddForm.module.css";
import {CategoryData} from "../../staticdata/CategoryData";
import {addImage} from "../../api/issue-image-api";
import Checkbox from '@mui/material/Checkbox';
import {convertAPITypesToUI, convertUITypesToAPI, getCurrentDate, getNumberFromIndex, isCorrectEmail} from "../../common/utils";
import {getAddressFromCoordinates} from "../../api/address-api";
import {Link} from "react-router-dom";
import {registerCitizen} from "../../api/citizen-api";
import {sendEmail} from "../../api/email-api";

const AddForm = ({passIsShown, passIsIssueAdded, markerPosition, setAll}) => {
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const emailInputRef = useRef();
    const [issueAdr, setIssueAdr] = useState('');
    const [photos, setPhotos] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const checkbox = useRef(null);
    const isLogged = localStorage.getItem("isLogged");
    const email = localStorage.getItem("email");
    const [currentMail, setCurrentMail] = useState(
        localStorage.getItem("email") ? localStorage.getItem("email") : "");
    const [citizenExists, setCitizenExists] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const token = localStorage.getItem("token");

    const sendAnEmail = (data) => {
        return sendEmail(token, data, (result, status, err) => {
            if (result !== null && status === 200) {}
            else {
                console.log(err);
            }
        })
    }

    const addAnIssue = (issue) => {
        return addIssue(token, issue, (result, status, err) => {
            if (result !== null && status === 201) {
                passIsIssueAdded((prev) => !prev);
                setAll(false);
                addAnImage(result);
                const content = `Sesizarea cu numărul ${result}, făcută de dumneavoastră, de tipul ${convertAPITypesToUI(issue.type)} (${issue.actualLocation}) a fost înregistrată cu succes.`
                    + `\nVă mulțumim pentru contribuția dumneavoastră la menținerea si dezvoltarea orașului Oradea!`;
                sendAnEmail({subject: "Sesizare Problemele de afară", toEmail: currentMail, content: content, issueId: result
                });
            } else {
                console.log(err);
            }
        });
    };

    const registerAnCitizen = (citizen) => {
        return registerCitizen(citizen, false,(result, status, err) => {
                if (result !== null && status === 201) {
                    setCitizenExists(false);
                    const currentEmail = !isLogged ? emailInputRef.current.value : null
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
                    passIsShown(false);
                } else {
                    setCitizenExists(true);
                }
            }
        )
    }

    const addAnImage = (id) => {
        photos.map((img, index) => {
            return addImage(id, img, getNumberFromIndex(index), (result, status, err) => {
                if (result !== null && status === 201) {
                }
            })
        });
    };

    const checkIfLocation = () => {
        return checkbox.current.checked ? markerPosition : {lat: null, lng: null};
    }

    const computeAddressFromCoordinates = (address) => {
        setIssueAdr("Fără adresă");
        return getAddressFromCoordinates(address, (result, status, err) => {
            if (result !== null && status === 200) {
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
                if (result.address.village != null) {
                    if (moreThanOneWord === true) {
                        issueAddress += ", "
                    }
                    issueAddress += result.address.village;
                }
                setIssueAdr(issueAddress);
            } else {
                console.log(err);
            }
        });
    }

    const hasLocation = () => {
        return !!checkbox.current.checked;
    }

    const handleAddIssue = () => {
        const currentEmail = !isLogged ? emailInputRef.current.value : null
        if (!isLogged) {
            if (currentEmail === null || currentEmail === '' || !isCorrectEmail(currentEmail)) {
                setIsValidEmail(false);
                setCitizenExists(false);
            } else {
                setIsValidEmail(true);
                setCitizenExists(false);
                setCurrentMail(currentEmail);
                const data = {
                    email: currentEmail,
                    firstName: null,
                    lastName: null,
                    password: null
                };
                registerAnCitizen(data);
            }
        } else {
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
            passIsShown(false);
        }
    }

    useEffect(() => {
        computeAddressFromCoordinates(checkIfLocation());
    }, [passIsShown, isChecked])

    const formHeight = isLogged ? 480 : 590
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
                                    return <option key={cat.id} style={{maxWidth: "1rem"}}>{cat.title}</option>
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
                        {citizenExists && <p className={classes.invalid}>Există acest cont! Autentifică-te</p>}
                        {!isValidEmail && <p className={classes.invalid}>Acest email nu este corect!</p>}
                        <Link to="/login" style={{textDecoration: "none", color: "#7895B2"}}>
                            Ai deja cont? Autentifică-te aici
                        </Link>
                    </FormGroup>
                </Row> : ""}
            </Form>
            <Button
                variant="contained"
                color="primary"
                style={{position: "absolute", left: "1rem", width: "8rem"}}
                onClick={handleAddIssue}
            >
                Adaugă
            </Button>
            <Button
                variant="contained"
                color="error"
                style={{position: "absolute", right: "1rem", width: "8rem"}}
                onClick={() => passIsShown(false)}
            >
                Închide
            </Button>
        </div>
    );
};

export default AddForm;
