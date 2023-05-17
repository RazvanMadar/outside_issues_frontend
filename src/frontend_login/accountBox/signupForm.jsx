import React, {useContext, useRef, useState} from "react";
import {BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton,} from "./common";
import {Marginer} from "../marginer";
import {AccountContext} from "./accountContext";
import ImageBox from "../../map-components/ImageBox";
import {registerCitizen} from "../../api/citizen-api";
import {addCitizenImage} from "../../api/citizen-image";

export function SignupForm() {
    const { switchToSignin } = useContext(AccountContext);
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const phoneInputRef = useRef();
    const [photos, setPhotos] = useState([]);
    const [deleteImage, setDeleteImage] = useState(false);

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
                switchToSignin((prev) => !prev);
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                console.log(err);
            }
        })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
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
                    console.log(err);
                }
            }
        )
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
            <br/>
            <ImageBox passIsPhoto={setPhotos} title={"Încărcă o poză cu tine"} numberOfPhotos={1} deleteImage={deleteImage}/>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton type="submit" onClick={submitHandler}>Înregistrare</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Ai deja un cont?
                <BoldLink href="#" onClick={switchToSignin}>
                    Autentifică-te
                </BoldLink>
            </MutedLink>
            <br/>
        </BoxContainer>
    );
}

