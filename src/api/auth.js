import axios from "axios";

const login_api = "http://localhost:8080/login";
const register_api = "http://localhost:8080/register";

const authenticate = (data, login, navigate, onLogin) => {
    axios
        .post(login_api, data)
        .then((response) => {
            console.log(response.data);
            onLogin(true);
            // login(response.data.accessToken, response.data.userId);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("isLogged", true);
            localStorage.setItem("role", response.data.role);
            navigate("/issues");
        })
        .catch((err) => {
            console.log(err);
        });
};

export {authenticate}