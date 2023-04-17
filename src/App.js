import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddIssuePage from "./pages/AddIssuePage";
import IssueMapOSM from "./pages/IssueMapOSM";
import Navbar3 from "./components/layout/Navbar3";
import LoginComponent from "./components/bootstrap_login/LoginComponent";
import {AuthProvider} from "./context/AuthContext";
import {useState} from "react";
import Logout from "./components/bootstrap_login/Logout";
import IssueDetails from "./pages/IssueDetails";
import Citizens from "./pages/Citizens";
import MyChat from "./components/chat/MyChat";

function App() {
    const url = "http://localhost:8080/api/issues";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(
        localStorage.getItem('dark_mode') ? localStorage.getItem("dark_mode") : "white"
    );

    return (
        // <NewLayout>
        // <Router> trebuie sters daca revin la <NewLayout >
        <Router>
            <AuthProvider>
                <Navbar3 isLoggedIn={isLoggedIn} passBackgroundColor={setBackgroundColor}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {/*<Route path="/chart" element={<BasicChart/>}/>*/}
                    <Route path="/issues" element={<Issues url={url} passBackgroundColor={backgroundColor}/>}/>
                    <Route path="/issues/:id" element={<IssueDetails/>}/>
                    <Route path="/add-issue" element={<AddIssuePage/>}/>
                    <Route path="/map" element={<IssueMapOSM passBackgroundCol={backgroundColor}/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/citizens" element={<Citizens/>}/>
                    <Route path="/login" element={<LoginComponent onLogin={setIsLoggedIn}/>}/>
                    <Route path="/loginB" element={<LoginPage/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/chat" element={<MyChat/>}/>
                </Routes>
            </AuthProvider>
        </Router>
        // </NewLayout>
    );
}

export default App;

