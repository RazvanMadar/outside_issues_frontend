import React, {useContext, useRef, useState} from "react";
import {AccountContext} from "./accountContext";
import {authenticate} from "../../api/auth";
import {useNavigate} from "react-router-dom";
import classes from "./Login.module.css";

const LoginMobile = ({login, onLogin}) => {
    const { switchToSignup } = useContext(AccountContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();
    const [isValidAccount, setIsValidAccount] = useState(true);
    const [isIncomplete, setIsIncomplete] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        if (enteredEmail === "" || enteredPassword === "") {
            setIsIncomplete(true);
            setIsValidAccount(true);
        }
        else {
            setIsIncomplete(false);
            return authenticate({email: enteredEmail, password: enteredPassword}, (result, status, err) => {
                if (result !== null && status === 200) {
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

    return (
        <div className={classes.authContainer}>
            <form className={classes.authForm}>
                <input className={classes.authInput} type="email" placeholder="Email" ref={emailInputRef}/>
                <input className={classes.authInput} type="password" placeholder="Parolă" ref={passwordInputRef}/>
            </form>
            {!isValidAccount && <p className={classes.invalid}>Email sau parolă gresită!</p>}
            {isIncomplete && <p className={classes.invalid}>Completează toate câmpurile!</p>}
            <button type="submit" className={classes.submitButton} onClick={submitHandler}>Autentificare</button>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div className={classes.firstLink} onClick={switchToSignup}>Nu ai încă un cont?{" "}</div>
                <div onClick={switchToSignup} className={classes.secondLink}>Înregistrează-te</div>
            </div>
        </div>
    );
}

export default LoginMobile;