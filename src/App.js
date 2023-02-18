import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddIssuePage from "./pages/AddIssuePage";
import LoginB from "./components/bootstrap_login/LoginB";
import IssueMapOSM from "./pages/IssueMapOSM";
import Navbar3 from "./components/layout/Navbar3";
import Navbar from "./components/layout/Navbar";
import LoginComponent from "./components/bootstrap_login/LoginComponent";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {useContext, useState} from "react";
import Logout from "./components/bootstrap_login/Logout";
import IssueDetails from "./pages/IssueDetails";

function App() {
    const url = "http://localhost:8080/api/issues";
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        // <NewLayout>
        // <Router> trebuie sters daca revin la <NewLayout >
        <Router>
            <AuthProvider>
            <Navbar3 isLoggedIn={isLoggedIn}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/issues" element={<Issues state={url}/>}/>
                    <Route path="/issues/:id" element={<IssueDetails />}/>
                    <Route path="/add-issue" element={<AddIssuePage/>}/>
                    <Route path="/map" element={<IssueMapOSM/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginComponent onLogin={setIsLoggedIn}/>}/>
                    <Route path="/loginB" element={<LoginPage/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </AuthProvider>
        </Router>
        // </NewLayout>
    );
}

export default App;
