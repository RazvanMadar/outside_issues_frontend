import axios from "axios";

const login_api = "http://localhost:8080/login";

const authenticate = (data, login, navigate, onLogin, setIsValidAccount) => {
    axios
        .post(login_api, data)
        .then((response) => {
            localStorage.removeItem("isBlocked");

            onLogin(true);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("firstName", response.data.firstName);
            localStorage.setItem("lastName", response.data.lastName);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("isLogged", "true");
            localStorage.setItem("role", response.data.role);
            setIsValidAccount(true);
            if (response.data.blocked === false) {
                navigate("/");
            } else {
                localStorage.setItem("isBlocked", "true");
                navigate("/blocked");
            }
        })
        .catch((err) => {
            setIsValidAccount(false);
        });
};

export {authenticate}