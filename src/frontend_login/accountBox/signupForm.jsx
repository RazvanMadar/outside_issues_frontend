import React, { useContext } from "react";
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
import ImageBox from "../../map-components/ImageBox";

export function SignupForm({setPhotos}) {
    const { switchToSignin } = useContext(AccountContext);

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="Prenume" />
                <Input type="text" placeholder="Nume" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Parolă" />
            </FormContainer>
            <br/>
            <ImageBox passIsPhoto={setPhotos} title={"Încărcă o poză cu tine"} numberOfPhotos={1}/>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton type="submit">Înregistrare</SubmitButton>
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

