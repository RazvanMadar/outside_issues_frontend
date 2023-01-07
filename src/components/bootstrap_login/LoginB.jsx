import React, {useEffect, useState, useRef} from "react";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import classes from "./LoginB.module.css";
import axios from "axios";

const LoginB = () => {
    const [isSignUp, setSignUp] = useState(false);
    const url = "http://localhost:8080/login";
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const submitHandler = async (event) => {
        // event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const data = {email: enteredEmail, password: enteredPassword};
        try {
            const response = await axios.post(url, JSON.stringify(data), {
                headers: {"Content-Type": "application/json"},
            });
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container style={{width: "auto", margin: "auto", maxWidth: "50rem"}}>
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
                        <h1 className={classes.h1}>Create Account</h1>
                        <input className={classes.input} type="text" placeholder="Name"/>
                        <input className={classes.input} type="email" placeholder="Email"/>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Password"
                        />
                        <button className={classes.button}>Sign Up</button>
                    </form>
                </div>
                <div className={classes.formContainer + " " + classes.signInContainer}>
                    <form className={classes.form}>
                        <h1 className={classes.h1}>Sign in</h1>
                        <input
                            className={classes.input}
                            type="email"
                            placeholder="Insert email"
                            id="email"
                            ref={emailInputRef}
                            required
                        />
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Insert password"
                            id="password"
                            ref={passwordInputRef}
                            required
                        />
                        <Link to="/">Forgot your password?</Link>
                        <button className={classes.button} onClick={submitHandler}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={classes.overlayContainer}>
                    <div className={classes.overlay}>
                        <div className={classes.overlayPanel + " " + classes.overlayLeft}>
                            <h1 className={classes.h1}>Welcome Back!</h1>
                            <p className={classes.p}>
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                className={classes.ghost + " " + classes.button}
                                id="signIn"
                                onClick={() => {
                                    setSignUp((prev) => !prev);
                                }}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className={classes.overlayPanel + " " + classes.overlayRight}>
                            <h1 className={classes.h1}>No account?</h1>
                            <p className={classes.p}>
                                Enter your personal details and sign up
                            </p>
                            <button
                                className={classes.ghost + " " + classes.button}
                                id="signUp"
                                onClick={() => {
                                    setSignUp((prev) => !prev);
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default LoginB;
