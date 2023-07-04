import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import classes from "./Login.module.css";
import {authenticate} from "../../api/auth";
import {registerCitizen} from "../../api/citizen-api";
import ImageBox from "../imagebox/ImageBox";
import {addCitizenImage} from "../../api/citizen-image";
import {isCorrectEmail, isCorrectPhoneNumber} from "../../common/utils";

const Login = ({login, onLogin}) => {
    const [isSignUp, setSignUp] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const firstNameRegisterInputRef = useRef();
    const lastNameRegisterInputRef = useRef();
    const emailRegisterInputRef = useRef();
    const passwordRegisterInputRef = useRef();
    const phoneRegisterInputRef = useRef();
    const [isValidAccount, setIsValidAccount] = useState(true);
    const [isIncomplete, setIsIncomplete] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [deleteImage, setDeleteImage] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        if (enteredEmail === "" || enteredPassword === "") {
            setIsIncomplete(true);
            setIsValidAccount(true);
        } else {
            setIsIncomplete(false);
            return authenticate({email: enteredEmail, password: enteredPassword}, (result, status, err) => {
                if (status === 200 && result !== null) {
                    localStorage.removeItem("isBlocked");
                    onLogin(true)
                    localStorage.setItem("userId", result.userId);
                    localStorage.setItem("email", result.email);
                    localStorage.setItem("firstName", result.firstName);
                    localStorage.setItem("lastName", result.lastName);
                    localStorage.setItem("token", result.accessToken);
                    localStorage.setItem("isLogged", "true");
                    localStorage.setItem("role", result.role);
                    setIsValidAccount(true);
                    if (result.blocked === false) {
                        navigate("/");
                    } else {
                        localStorage.setItem("isBlocked", "true");
                        navigate("/blocked");
                    }
                } else {
                    setIsValidAccount(false);
                }
            });
        }
    };

    const addAnImage = (id) => {
        return addCitizenImage(id, photos[0], (result, status, err) => {
            if (status === 201) {
                firstNameRegisterInputRef.current.value = "";
                lastNameRegisterInputRef.current.value = "";
                emailRegisterInputRef.current.value = "";
                passwordRegisterInputRef.current.value = "";
                phoneRegisterInputRef.current.value = "";
                setPhotos([]);
                if (result !== null) {
                    setDeleteImage((prev) => !prev)
                }
                setIsValidEmail(true);
                setIsIncomplete(false);
                setIsValidPassword(true);
                setIsValidPhone(true);
                setIsValidAccount(true);
                setSignUp((prev) => !prev);
            }
        })
    };

    const registerHandler = (event) => {
        event.preventDefault();
        const enteredFirstName = firstNameRegisterInputRef.current.value;
        const enteredLastName = lastNameRegisterInputRef.current.value;
        const enteredEmail = emailRegisterInputRef.current.value;
        const enteredPassword = passwordRegisterInputRef.current.value;
        const enteredPhone = phoneRegisterInputRef.current.value;
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
                phoneNumber: enteredPhone[0] === "+" ? enteredPhone : "+4" + enteredPhone,
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
        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <div
                className={
                    isSignUp
                        ? classes.rightPanelActive + " " + classes.container
                        : classes.container
                }
                id="container"
            >
                <div className={classes.formContainer + " " + classes.signUpContainer}>
                    <form className={classes.form}>
                        <h1 className={classes.h1}>Creare cont</h1>
                        <br/>
                        <input className={classes.input} type="text" placeholder="Prenume"
                               ref={firstNameRegisterInputRef}/>
                        <input className={classes.input} type="text" placeholder="Nume" ref={lastNameRegisterInputRef}/>
                        <input className={classes.input} type="email" placeholder="Email" ref={emailRegisterInputRef}/>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Parolă"
                            ref={passwordRegisterInputRef}
                        />
                        <input className={classes.input} type="text" placeholder="Număr de telefon"
                               ref={phoneRegisterInputRef}/>
                        <div style={{marginBottom: "5px"}}>
                            <ImageBox passIsPhoto={setPhotos} title={"Încărcă o poză cu tine"} numberOfPhotos={1}
                                      deleteImage={deleteImage}/>
                        </div>
                        {!isValidAccount && <p className={classes.invalid}>Emailul există deja!</p>}
                        {isIncomplete && <p className={classes.invalid}>Completează toate câmpurile!</p>}
                        {!isValidEmail && <p className={classes.invalid}>Emailul nu e valid!</p>}
                        {!isValidPassword && <p className={classes.invalid}>Minim 8 caractere pentru parolă!</p>}
                        {!isValidPhone && <p className={classes.invalid}>Numărul de telefon nu e valid!</p>}
                        <button className={classes.button} onClick={registerHandler}>Înregistrare</button>
                    </form>
                </div>
                <div className={classes.formContainer + " " + classes.signInContainer}>
                    <form className={classes.form}>
                        <h1 className={classes.h1}>Intră în cont</h1>
                        <br/>
                        <input
                            className={classes.input}
                            type="email"
                            placeholder="Email"
                            id="email"
                            ref={emailInputRef}
                            required
                        />
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Parolă"
                            id="password"
                            ref={passwordInputRef}
                            required
                        />
                        <br/>
                        {!isValidAccount && <p className={classes.invalid}>Email sau parolă gresită!</p>}
                        {isIncomplete && <p className={classes.invalid}>Completează toate câmpurile!</p>}
                        <button className={classes.button} onClick={submitHandler}>
                            Autentificare
                        </button>
                    </form>
                </div>
                <div className={classes.overlayContainer}>
                    <div className={classes.overlay}>
                        <div className={classes.overlayPanel + " " + classes.overlayLeft}>
                            <h1 className={classes.h1}>Bine ai revenit!</h1>
                            <p className={classes.p}>
                                Ai deja un cont? Autentifică-te aici!
                            </p>
                            <button
                                className={classes.ghost + " " + classes.button}
                                id="signIn"
                                onClick={() => {
                                    firstNameRegisterInputRef.current.value = '';
                                    lastNameRegisterInputRef.current.value = '';
                                    emailRegisterInputRef.current.value = '';
                                    passwordRegisterInputRef.current.value = '';
                                    phoneRegisterInputRef.current.value = '';
                                    setDeleteImage((prev) => !prev)
                                    setIsValidEmail(true);
                                    setIsIncomplete(false);
                                    setIsValidPassword(true);
                                    setIsValidAccount(true);
                                    setIsValidPhone(true);
                                    setSignUp((prev) => !prev);
                                }}
                            >
                                Autentificare
                            </button>
                        </div>
                        <div className={classes.overlayPanel + " " + classes.overlayRight}>
                            <h1 className={classes.h1}>Nu ai cont?</h1>
                            <p className={classes.p}>
                                Încă nu ai un cont? Creează-ți unul aici!
                            </p>
                            <button
                                className={classes.ghost + " " + classes.button}
                                id="signUp"
                                onClick={() => {
                                    emailInputRef.current.value = '';
                                    passwordInputRef.current.value = '';
                                    setIsValidEmail(true);
                                    setIsIncomplete(false);
                                    setIsValidPassword(true);
                                    setIsValidAccount(true);
                                    setIsValidPhone(true);
                                    setSignUp((prev) => !prev);
                                }}
                            >
                                Înregistrare
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
