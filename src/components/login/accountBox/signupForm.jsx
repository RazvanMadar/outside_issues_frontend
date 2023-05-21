import React, {useContext, useRef, useState} from "react";
import {BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton,} from "./common";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";
import ImageBox from "../../../imagebox/ImageBox";
import {registerCitizen} from "../../../api/citizen-api";
import {addCitizenImage} from "../../../api/citizen-image";
import classes from "../Login.module.css";
import {isCorrectEmail, isCorrectPhoneNumber} from "../../../common/utils";

export function SignupForm() {
    const {switchToSignin} = useContext(AccountContext);
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const phoneInputRef = useRef();
    const [photos, setPhotos] = useState([]);
    const [deleteImage, setDeleteImage] = useState(false);
    const [isValidAccount, setIsValidAccount] = useState(true);
    const [isIncomplete, setIsIncomplete] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);

    const handleChangeContext = () => {
        firstNameInputRef.current.value = '';
        lastNameInputRef.current.value = '';
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        phoneInputRef.current.value = '';
        setDeleteImage((prev) => !prev)
        setIsValidEmail(true);
        setIsIncomplete(false);
        setIsValidPassword(true);
        setIsValidAccount(true);
        setIsValidPhone(true);
        switchToSignin();
    }

    const addAnImage = (id) => {
        console.log(id, photos[0])
        return addCitizenImage(id, photos[0], (result, status, err) => {
            if (status === 201) {
                firstNameInputRef.current.value = "";
                lastNameInputRef.current.value = "";
                emailInputRef.current.value = "";
                passwordInputRef.current.value = "";
                phoneInputRef.current.value = "";
                setPhotos([]);
                if (result !== null) {
                    setDeleteImage((prev) => !prev)
                }
                setIsValidEmail(true);
                setIsIncomplete(false);
                setIsValidPassword(true);
                setIsValidPhone(true);
                setIsValidAccount(true);
                switchToSignin((prev) => !prev);
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                console.log(err);
            }
        })
    };

    const registerHandler = (event) => {
        event.preventDefault();
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        if (enteredFirstName === "" || enteredLastName === "" || enteredEmail === "" || enteredPassword === "" || enteredPhone === "") {
            setIsIncomplete(true);
            setIsValidAccount(true);
            setIsValidEmail(true);
            setIsValidPassword(true);
            setIsValidPhone(true);
        } else if (!isCorrectEmail(enteredEmail)) {
            setIsValidEmail(false);
            setIsIncomplete(false);
            setIsValidAccount(true);
            setIsValidPassword(true);
            setIsValidPhone(true);
        } else if (enteredPassword.length < 8) {
            setIsValidPassword(false);
            setIsIncomplete(false);
            setIsValidEmail(true);
            setIsValidAccount(true);
            setIsValidPhone(true);
        } else if (!isCorrectPhoneNumber(enteredPhone)) {
            setIsValidPhone(false);
            setIsValidPassword(true);
            setIsIncomplete(false);
            setIsValidEmail(true);
            setIsValidAccount(true);
        } else {
            const data = {
                email: enteredEmail,
                phoneNumber: enteredPhone,
                firstName: enteredFirstName,
                lastName: enteredLastName,
                password: enteredPassword
            };
            return registerCitizen(data, true, (result, status, err) => {
                    if (result !== null && status === 201) {
                        addAnImage(result)
                    } else {
                        setIsValidAccount(false);
                        setIsIncomplete(false);
                        setIsValidEmail(true);
                        setIsValidPassword(true);
                        setIsValidPhone(true);
                    }
                }
            )
        }
    }

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="Prenume" ref={firstNameInputRef}/>
                <Input type="text" placeholder="Nume" ref={lastNameInputRef}/>
                <Input type="email" placeholder="Email" ref={emailInputRef}/>
                <Input type="password" placeholder="Parolă" ref={passwordInputRef}/>
                <Input type="text" placeholder="Număr de telefon" ref={phoneInputRef}/>
            </FormContainer>
            <div style={{marginTop: "8px"}}>
                <ImageBox passIsPhoto={setPhotos} title={"Încărcă o poză cu tine"}
                          numberOfPhotos={1} deleteImage={deleteImage}/>
            </div>
            {!isValidAccount && <p className={classes.invalid}>Emailul există deja!</p>}
            {isIncomplete && <p className={classes.invalid}>Completează toate câmpurile!</p>}
            {!isValidEmail && <p className={classes.invalid}>Emailul nu e valid!</p>}
            {!isValidPassword && <p className={classes.invalid}>Minim 8 caractere pentru parolă!</p>}
            {!isValidPhone && <p className={classes.invalid}>Numărul de telefon nu e valid!</p>}
            <Marginer direction="vertical" margin={8}/>
            <SubmitButton type="submit" onClick={registerHandler}>Înregistrare</SubmitButton>
            <Marginer direction="vertical" margin="10px"/>
            <MutedLink href="#">
                Ai deja un cont?
                <BoldLink href="#" onClick={handleChangeContext}>
                    Autentifică-te
                </BoldLink>
            </MutedLink>
            <br/>
        </BoxContainer>
    );
}

