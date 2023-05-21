import React, {useEffect, useState} from "react";
import Login from "../components/login/Login";
import {AccountBox} from "../components/login/accountBox";

const LoginComponent = ({onLogin}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [component, setComponent] = useState(width > 768 ? <Login onLogin={onLogin}/> : <AccountBox onLogin={onLogin}/>);

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
            setComponent(window.innerWidth > 768 ? <Login onLogin={onLogin}/> : <AccountBox onLogin={onLogin}/>);
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