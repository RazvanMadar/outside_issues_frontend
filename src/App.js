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
import MyProfile from "./pages/MyProfile";
import IssueDetails2 from "./pages/IssueDetails2";
import BlockedPage from "./pages/BlockedPage";
import withBlockRedirect from "./hooks/redictBlockedUser";
import NotFound from "./pages/NotFound";

function App() {
    const HomePageWithBlockRedirect = withBlockRedirect(Home);
    const IssuesPageWithBlockRedirect = withBlockRedirect(Issues);
    const MyProfilePageWithBlockRedirect = withBlockRedirect(MyProfile);
    const AddIssuePageWithBlockRedirect = withBlockRedirect(AddIssuePage);
    const IssueMapPageWithBlockRedirect = withBlockRedirect(IssueMapOSM);
    const RegisterPageWithBlockRedirect = withBlockRedirect(RegisterPage);
    const CitizensPageWithBlockRedirect = withBlockRedirect(Citizens);
    const MyChatPageWithBlockRedirect = withBlockRedirect(MyChat);

    const url = "http://localhost:8080/api/issues";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isIssueAdded, setIsIssueAdded] = useState(false);
    const [isIssueDeleted, setIsIssueDeleted] = useState(false);
    const [isIssueUpdated, setIsIssueUpdated] = useState(false);
    const [persons, setPersons] = useState([]);
    const [receivedNewUserMessage, setReceivedNewUserMessage] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(
        localStorage.getItem('dark_mode') ? localStorage.getItem("dark_mode") : "white"
    );

    return (
        // <NewLayout>
        // <Router> trebuie sters daca revin la <NewLayout >
        <Router>
            <AuthProvider>
                <Navbar3 isLoggedIn={isLoggedIn} passBackgroundColor={setBackgroundColor}
                         passIsIssueAdded={isIssueAdded} passIsIssueUpdated={isIssueUpdated}
                         passIsIssueDeleted={isIssueDeleted} passSetIsIssueAdded={setIsIssueAdded} passSetIsIssueUpdated={setIsIssueUpdated} passSetIsIssueDeleted={setIsIssueDeleted} passPersons={persons} passSetPersons={setPersons} passSetReceivedNewUserMessage={setReceivedNewUserMessage}/>
                <Routes>
                    <Route path="/" element={<HomePageWithBlockRedirect isDeleted={isIssueDeleted} isAdded={isIssueAdded} isUpdated={isIssueUpdated}/>}/>
                    {/*<Route path="/chart" element={<BasicChart/>}/>*/}
                    <Route path="/issues"
                           element={<IssuesPageWithBlockRedirect url={url} passBackgroundColor={backgroundColor} isDeleted={isIssueDeleted}
                                            setIsDeleted={setIsIssueDeleted} isUpdated={isIssueUpdated} setIsUpdated={setIsIssueUpdated} isAdded={isIssueAdded}/>}/>
                    <Route path="/profile"
                           element={<MyProfilePageWithBlockRedirect passIsDeleted={isIssueDeleted} passIsUpdated={isIssueUpdated}
                                               passBackgroundColor={backgroundColor}/>}/>
                    {/*<Route path="/issues/:id" element={<IssueDetails2 passIsUpdated={setIsIssueUpdated}/>}/>*/}
                    <Route path="/add-issue" element={<AddIssuePageWithBlockRedirect/>}/>
                    <Route path="/map"
                           element={<IssueMapPageWithBlockRedirect passBackgroundCol={backgroundColor} passIsIssueAdded={isIssueAdded}
                                                 passSetIsIssuesAdded={setIsIssueAdded} passIsIssueUpdated={isIssueUpdated} passIsIssueDeleted={isIssueDeleted}/>}/>
                    <Route path="/register" element={<RegisterPageWithBlockRedirect/>}/>
                    <Route path="/citizens"
                           element={<CitizensPageWithBlockRedirect passIsDeleted={isIssueDeleted} passBackgroundColor={backgroundColor}/>}/>
                    <Route path="/login" element={<LoginComponent onLogin={setIsLoggedIn}/>}/>
                    <Route path="/blocked" element={<BlockedPage url={url} backgroundColor={backgroundColor}
                                                                 isIssueDeleted={isIssueDeleted}
                                                                 setIsIssueDeleted={setIsIssueDeleted}/>}/>
                    <Route path="/loginB" element={<LoginPage/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/chat" element={<MyChatPageWithBlockRedirect passBackgroundColor={backgroundColor} passPersons={persons} passSetPersons={setPersons} passReceivedNewUserMessage={receivedNewUserMessage} passSetReceivedNewUserMessage={setReceivedNewUserMessage}/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>
        // </NewLayout>
    );
}

export default App;

