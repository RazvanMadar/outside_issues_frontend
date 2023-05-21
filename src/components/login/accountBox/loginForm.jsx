import React, {useContext, useRef, useState} from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import {authenticate} from "../../../api/auth";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import classes from "../Login.module.css";

export function LoginForm({onLogin}) {
    const { switchToSignup } = useContext(AccountContext);
    const {isLogged, token, userId, login, logout} = useContext(AuthContext);
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
            const data = {email: enteredEmail, password: enteredPassword};
            authenticate(data, login, navigate, onLogin, setIsValidAccount);
        }
    };

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="email" placeholder="Email" ref={emailInputRef}/>
                <Input type="password" placeholder="Parolă" ref={passwordInputRef}/>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <Marginer direction="vertical" margin="1.6em" />
            {!isValidAccount && <p className={classes.invalid}>Email sau parolă gresită!</p>}
            {isIncomplete && <p className={classes.invalid}>Completează toate câmpurile!</p>}
            <SubmitButton type="submit" onClick={submitHandler}>Autentificare</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Nu ai încă un cont?{" "}
                <BoldLink href="#" onClick={switchToSignup}>
                    Înregistrează-te
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}

