import React, {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import classes from "./LoginB.module.css";
import {authenticate} from "../../api/auth";
import {AuthContext} from "../../context/AuthContext";

const LoginB = ({onLogin}) => {
    const [isSignUp, setSignUp] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const { isLogged, token, userId, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const data = {email: enteredEmail, password: enteredPassword};
        authenticate(data, login, navigate, onLogin);
    };


    return (
        <div style={{position:"absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
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
                        <input className={classes.input} type="text" placeholder="Prenume"/>
                        <input className={classes.input} type="text" placeholder="Nume"/>
                        <input className={classes.input} type="email" placeholder="Email"/>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Parolă"
                        />
                        <input className={classes.input} type="text" placeholder="Număr de telefon"/>
                        <br/>
                        <button className={classes.button}>Înregistrare</button>
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
