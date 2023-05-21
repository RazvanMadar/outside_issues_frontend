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

    console.log(window.innerHeight)    // 569 pe TV ul de acasa

    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("role");
    localStorage.removeItem("isBlocked");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");

    useEffect(() => {
        onLogin(false);

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
        <div style={{paddingTop: "55px"}}>
            {component}
        </div>
    );

};

export default LoginComponent;