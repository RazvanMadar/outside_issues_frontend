import axios from "axios";

const login_api = "http://localhost:8080/login";

const authenticate = (data, login, navigate) => {
    axios
        .post(login_api, data)
        .then((response) => {
            console.log(response.data);
            // login(response.data.accessToken, response.data.userId);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("token", response.data.accessToken);
            sessionStorage.setItem("isLogged", true);
            navigate("/issues");
        })
        .catch((err) => {
            console.log(err);
        });
};

export {authenticate}