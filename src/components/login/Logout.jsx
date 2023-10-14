import LoginComponent from "../../pages/LoginComponent";

const Logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("isBlocked");

    return (
      <LoginComponent />
    );
};

export default Logout