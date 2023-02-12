import LoginComponent from "./LoginComponent";

const Logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLogged");
    return (
      <LoginComponent />
    );
};

export default Logout