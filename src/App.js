import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import IssueMapOSM from "./pages/IssueMapOSM";
import Navbar3 from "./components/navbar/Navbar3";
import LoginComponent from "./pages/LoginComponent";
import {AuthProvider} from "./context/AuthContext";
import {useState} from "react";
import Logout from "./components/login/Logout";
import Citizens from "./pages/Citizens";
import MyChat from "./components/chat/MyChat";
import MyProfile from "./pages/MyProfile";
import BlockedPage from "./pages/BlockedPage";
import NotFound from "./pages/NotFound";
import RequireAuthentication from "./navigation/RequireAuthentication";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ForbiddenPage from "./pages/ForbiddenPage";

const ROLES = {
    CITIZEN: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    UNNECESSARY: 'ALL'
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isIssueAdded, setIsIssueAdded] = useState(false);
    const [isIssueDeleted, setIsIssueDeleted] = useState(false);
    const [isIssueUpdated, setIsIssueUpdated] = useState(false);
    const [isMessageAdded, setIsMessageAdded] = useState(false);
    const [persons, setPersons] = useState([]);
    const [receivedNewUserMessage, setReceivedNewUserMessage] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(
        localStorage.getItem('dark_mode') ? localStorage.getItem("dark_mode") : "white"
    );
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;
    const role = localStorage.getItem('role');

    return (
        <Router>
            <AuthProvider>
                <Navbar3 passBackgroundColor={setBackgroundColor} passSetIsMessageAdded={setIsMessageAdded}
                         passIsIssueAdded={isIssueAdded} passIsIssueUpdated={isIssueUpdated} isLoggedIn={isLoggedIn}
                         passIsIssueDeleted={isIssueDeleted} passSetIsIssueAdded={setIsIssueAdded}
                         passSetIsIssueUpdated={setIsIssueUpdated} passSetIsIssueDeleted={setIsIssueDeleted}
                         passPersons={persons} passSetReceivedNewUserMessage={setReceivedNewUserMessage} />
                <Routes>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/"
                               element={<Home isDeleted={isIssueDeleted} isAdded={isIssueAdded}
                                              isUpdated={isIssueUpdated}/>}/>
                    </Route>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/issues"
                               element={<Issues passBackgroundColor={backgroundColor}
                                                isDeleted={isIssueDeleted}
                                                setIsDeleted={setIsIssueDeleted}
                                                isUpdated={isIssueUpdated}
                                                setIsUpdated={setIsIssueUpdated}
                                                isAdded={isIssueAdded}/>}/>
                    </Route>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.CITIZEN]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/profile" element={<MyProfile passIsDeleted={isIssueDeleted}
                                                                   passIsUpdated={isIssueUpdated}
                                                                   passSetIsIssueUpdated={setIsIssueUpdated}
                                                                   passBackgroundColor={backgroundColor}/>}/>
                    </Route>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/map"
                               element={<IssueMapOSM passBackgroundCol={backgroundColor}
                                                     passIsIssueAdded={isIssueAdded}
                                                     passSetIsIssuesAdded={setIsIssueAdded}
                                                     passIsIssueUpdated={isIssueUpdated}
                                                     passIsIssueDeleted={isIssueDeleted}/>}/>
                    </Route>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.ADMIN]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/citizens"
                               element={<Citizens passIsDeleted={isIssueDeleted}
                                                  passBackgroundColor={backgroundColor}/>}/>
                    </Route>

                    <Route path="/login" element={<LoginComponent onLogin={setIsLoggedIn}/>}/>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/blocked" element={<BlockedPage backgroundColor={backgroundColor}/>}/>
                    </Route>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/unauthorized" element={<UnauthorizedPage />}/>
                    </Route>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/forbidden" element={<ForbiddenPage />}/>
                    </Route>

                    <Route path="/logout" element={<Logout />}/>

                    <Route element={<RequireAuthentication allowedRoles={[ROLES.CITIZEN, ROLES.ADMIN]} isBlocked={isBlocked} role={role}/>}>
                        <Route path="/chat" element={<MyChat passBackgroundColor={backgroundColor}
                                                             passPersons={persons}
                                                             passSetPersons={setPersons}
                                                             passReceivedNewUserMessage={receivedNewUserMessage}
                                                             passIsMessageAdded={isMessageAdded} passSetIsMessageAdded={setIsMessageAdded}
                        />}/>
                    </Route>

                    <Route path="*" element={<NotFound/>}/>

                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
