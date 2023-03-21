import React, {useContext, useEffect, useState} from "react";
import LoginB from "./LoginB";
import {AuthContext} from "../../context/AuthContext";
import Issues from "../../pages/Issues";
import {Redirect, useNavigate} from 'react-router-dom'
import {AccountBox} from "../../frontend_login/accountBox";

const LoginComponent = ({onLogin}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [component, setComponent] = useState(width > 768 ? <LoginB onLogin={onLogin}/> : <AccountBox onLogin={onLogin}/>);
    // const { isLogged } = useContext(AuthContext);

    const isLogged = localStorage.getItem("isLogged");
    const navigate = useNavigate();
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("role")
    onLogin(false);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setComponent(window.innerWidth > 768 ? <LoginB onLogin={onLogin}/> : <AccountBox onLogin={onLogin}/>);
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