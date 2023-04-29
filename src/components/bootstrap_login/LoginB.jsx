import React, {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import classes from "./LoginB.module.css";
import {authenticate} from "../../api/auth";
import {AuthContext} from "../../context/AuthContext";
import {registerCitizen} from "../../api/citizen-api";
import ImageBox from "../../map-components/ImageBox";
import {addCitizenImage} from "../../api/citizen-image";

const LoginB = ({onLogin}) => {
    const [isSignUp, setSignUp] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const firstNameRegisterInputRef = useRef();
    const lastNameRegisterInputRef = useRef();
    const emailRegisterInputRef = useRef();
    const passwordRegisterInputRef = useRef();
    const phoneRegisterInputRef = useRef();

    const {isLogged, token, userId, login, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [photos, setPhotos] = useState([]);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const data = {email: enteredEmail, password: enteredPassword};
        authenticate(data, login, navigate, onLogin);
    };

    const addAnImage = (id) => {
        console.log(id, photos[0])
        return addCitizenImage(id, photos[0], (result, status, err) => {
            if (result !== null && status === 201) {
                console.log("RESULT", result);
                // navigate("/login")
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                console.log(err);
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
        const data = {
            email: enteredEmail,
            phoneNumber: enteredPhone,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            password: enteredPassword
        };
        return registerCitizen(data, (result, status, err) => {
                if (result !== null && status === 201) {
                    console.log(result);
                    addAnImage(result)
                } else {
                    console.log(err);
                }
            }
        )
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
                        <h1 className={classes.h1}>Creează-ți contul</h1>
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
                        <ImageBox passIsPhoto={setPhotos} title={"Încărcați o poză cu dvs."} numberOfPhotos={1}/>
                        <br/>
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
                        <Link to="/">Ți-ai uitat parola?</Link>
                        <br/>
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
                                Pentru a beneficia de plusurile logării, loghează-te :))
                            </p>
                            <button
                                className={classes.ghost + " " + classes.button}
                                id="signIn"
                                onClick={() => {
                                    setSignUp((prev) => !prev);
                                }}
                            >
                                Autentificare
                            </button>
                        </div>
                        <div className={classes.overlayPanel + " " + classes.overlayRight}>
                            <h1 className={classes.h1}>Nu ai cont?</h1>
                            <p className={classes.p}>
                                Înregistrează-te aici
                            </p>
                            <button
                                className={classes.ghost + " " + classes.button}
                                id="signUp"
                                onClick={() => {
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

export default LoginB;
