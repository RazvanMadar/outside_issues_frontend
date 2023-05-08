import axios from "axios";

const login_api = "http://localhost:8080/login";
const register_api = "http://localhost:8080/register";

const authenticate = (data, login, navigate, onLogin) => {
    axios
        .post(login_api, data)
        .then((response) => {
            // const isBlocked = localStorage.getItem("isBlocked");
            // if (isBlocked !== null) {
            // }
            localStorage.removeItem("isBlocked");
            console.log(response.data);
            if (response.data.isBlocked === false) {
                onLogin(true);
                // login(response.data.accessToken, response.data.userId);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("firstName", response.data.firstName);
                localStorage.setItem("lastName", response.data.lastName);
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("isLogged", true);
                localStorage.setItem("role", response.data.role);
                navigate("/issues");
            } else {
                localStorage.setItem("isBlocked", "true");
                navigate("/blocked");
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export {authenticate}