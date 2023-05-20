import LoginComponent from "./LoginComponent";

const Logout = ({onLogin}) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("isBlocked");
    onLogin(false);
    return (
      <LoginComponent />
    );
};

export default Logout