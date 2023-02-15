import LoginComponent from "./LoginComponent";

const Logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    return (
      <LoginComponent />
    );
};

export default Logout