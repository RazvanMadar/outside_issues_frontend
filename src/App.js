import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import IssueMapOSM from "./pages/IssueMapOSM";
import Navbar3 from "./components/navbar/Navbar3";
import LoginComponent from "./pages/LoginComponent";
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
        <BrowserRouter>  // Componenta care înglobează rutarea
            <Navbar3 passBackgroundColor={setBackgroundColor} passSetIsMessageAdded={setIsMessageAdded}  // Componenta bării de navigare cu proprietățile transmise
                     passIsIssueAdded={isIssueAdded} passIsIssueUpdated={isIssueUpdated} isLoggedIn={isLoggedIn} passIsIssueDeleted={isIssueDeleted} passSetIsIssueAdded={setIsIssueAdded}
                     passSetIsIssueUpdated={setIsIssueUpdated} passSetIsIssueDeleted={setIsIssueDeleted} passPersons={persons} passSetReceivedNewUserMessage={setReceivedNewUserMessage}/>
            <Routes>  // înglobează toate rutele disponibile în aplicație
                <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>  // Ruta nu necesită ca utilizatorul să aibe rol
                    <Route path="/" element={<Home isDeleted={isIssueDeleted} isAdded={isIssueAdded} isUpdated={isIssueUpdated}/>}/>  // Ruta pentru pagina principală și proprietățile ei
                </Route>
                <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>  // Ruta nu necesită ca utilizatorul să aibe rol
                    <Route path="/issues" element={<Issues passBackgroundColor={backgroundColor} isDeleted={isIssueDeleted}  // Ruta pentru pagina cu sesizări și proprietățile ei
                                            setIsDeleted={setIsIssueDeleted} isUpdated={isIssueUpdated} setIsUpdated={setIsIssueUpdated} isAdded={isIssueAdded}/>}/>
                </Route>
                <Route
                    element={<RequireAuthentication allowedRoles={[ROLES.CITIZEN]} isBlocked={isBlocked} role={role}/>}>  // Ruta necesită ca utilizatorul să aibe rol de cetățean
                    <Route path="/profile" element={<MyProfile passIsDeleted={isIssueDeleted} passIsUpdated={isIssueUpdated}  // Ruta pentru pagina cu profilul utilizatorului și proprietățile ei
                                                               passSetIsIssueUpdated={setIsIssueUpdated} passBackgroundColor={backgroundColor}/>}/> </Route>
                <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>   // Ruta nu necesită ca utilizatorul să aibe rol
                    <Route path="/map" element={<IssueMapOSM passBackgroundCol={backgroundColor} passIsIssueAdded={isIssueAdded}  // Ruta pentru pagina cu harta sesizărilor și proprietățile ei
                                                 passSetIsIssuesAdded={setIsIssueAdded} passIsIssueUpdated={isIssueUpdated} passIsIssueDeleted={isIssueDeleted}/>}/>
                </Route>
                <Route
                    element={<RequireAuthentication allowedRoles={[ROLES.ADMIN]} isBlocked={isBlocked} role={role}/>}>  // Ruta necesită ca utilizatorul să aibe rol de administrator
                    <Route path="/citizens" element={<Citizens passIsDeleted={isIssueDeleted} passBackgroundColor={backgroundColor}/>}/>  // Ruta pentru pagina cu cetățenii și proprietățile ei
                </Route>
                <Route path="/login" element={<LoginComponent login={isLoggedIn} onLogin={setIsLoggedIn}/>}/>  // Ruta pentru pagina de autentificare și proprietățile ei
                <Route path="*" element={<NotFound/>}/>  // Pagina pentru rutele care nu exista, toate sunt capturate de "*" dacă nu au intrat mai sus pe o rută existentă
                <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>  // Ruta nu necesită ca utilizatorul să aibe rol
                    <Route path="/blocked" element={<BlockedPage backgroundColor={backgroundColor}/>}/>  // Ruta pentru pagina vizualizată în cazul cetățenilor blocați
                </Route>
                <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>  // Ruta nu necesită ca utilizatorul să aibe rol
                    <Route path="/unauthorized" element={<UnauthorizedPage/>}/>  // Ruta pentru pagina vizualizată de un utilizator neautorizat
                </Route>
                <Route element={<RequireAuthentication allowedRoles={[ROLES.UNNECESSARY]} isBlocked={isBlocked} role={role}/>}>  // Ruta nu necesită ca utilizatorul să aibe rol
                    <Route path="/forbidden" element={<ForbiddenPage/>}/>  // Ruta pentru pagina vizualizată de un utilizator neautorizat
                </Route>
                <Route path="/logout" element={<Logout/>}/>
                <Route element={<RequireAuthentication allowedRoles={[ROLES.CITIZEN, ROLES.ADMIN]} isBlocked={isBlocked} role={role}/>}>  // Ruta necesită ca utilizatorul să aibe rol de administrator sau cetățean
                    <Route path="/chat" element={<MyChat passBackgroundColor={backgroundColor} passPersons={persons} passSetPersons={setPersons}  // Ruta pentru pagina cu chat-ul aplicației și proprietățile ei
                                                         passReceivedNewUserMessage={receivedNewUserMessage} passIsMessageAdded={isMessageAdded} passSetIsMessageAdded={setIsMessageAdded}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
