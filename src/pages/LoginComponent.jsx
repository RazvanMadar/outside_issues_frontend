import React, {useEffect, useState} from "react";
import Login from "../components/login/Login";
import MobileForm from "../components/login/MobileForm";

const LoginComponent = ({login, onLogin}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [component, setComponent] = useState(width > 768 ? <Login onLogin={onLogin}/> : <MobileForm onLogin={onLogin}/>);

    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("role");
    localStorage.removeItem("isBlocked");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");

    useEffect(() => {
        console.log(login);
        onLogin(false);

        const handleResize = () => {
            setWidth(window.innerWidth);
            setComponent(window.innerWidth > 768 ? <Login onLogin={onLogin}/> : <MobileForm onLogin={onLogin}/>);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{paddingTop: "28px"}}>
            {component}
        </div>
    );

};

export default LoginComponent;