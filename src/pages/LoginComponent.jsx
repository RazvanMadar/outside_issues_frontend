import React, {useEffect, useState} from "react";
import Login from "../components/login/Login";
import MobileForm from "../components/login/MobileForm";

const LoginComponent = ({login, onLogin}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [component, setComponent] = useState(width > 768 ? <Login login={login} onLogin={onLogin}/> : <MobileForm login={login} onLogin={onLogin}/>);

    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("role");
    localStorage.removeItem("isBlocked");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");

    useEffect(() => {
        onLogin((prev) => !prev)

        const resizeComponent = () => {
            setWidth(window.innerWidth);
            setComponent(window.innerWidth > 768 ? <Login onLogin={onLogin}/> : <MobileForm onLogin={onLogin}/>);
        };

        window.addEventListener('resize', resizeComponent);

        return () => {
            window.removeEventListener('resize', resizeComponent);
        };
    }, []);

    return (
        <div style={{paddingTop: "55px"}}>
            {component}
        </div>
    );

};

export default LoginComponent;