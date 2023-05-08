import React, {useContext, useRef} from "react";
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
import {authenticate} from "../../api/auth";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

export function LoginForm({onLogin}) {
    const { switchToSignup } = useContext(AccountContext);
    const {isLogged, token, userId, login, logout} = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const data = {email: enteredEmail, password: enteredPassword};
        authenticate(data, login, navigate, onLogin);
    };

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="email" placeholder="Email" ref={emailInputRef}/>
                <Input type="password" placeholder="Parolă" ref={passwordInputRef}/>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            {/*<MutedLink href="#">Ți-ai uitat parola?</MutedLink>*/}
            <Marginer direction="vertical" margin="1.6em" />
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

