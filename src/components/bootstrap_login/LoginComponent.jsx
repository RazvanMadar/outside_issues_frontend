import React, {useContext, useEffect, useState} from "react";
import LoginB from "./LoginB";
import LoginMobile from "./LoginMobile";
import {AuthContext} from "../../context/AuthContext";
import Issues from "../../pages/Issues";
import {Redirect, useNavigate} from 'react-router-dom'

const LoginComponent = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [component, setComponent] = useState(width > 768 ? <LoginB/> : <LoginMobile/>);
    // const { isLogged } = useContext(AuthContext);

    const isLogged = sessionStorage.getItem("isLogged");
    const navigate = useNavigate();
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLogged");

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setComponent(window.innerWidth > 768 ? <LoginB/> : <LoginMobile/>);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {component}
        </div>
    );

};

export default LoginComponent;