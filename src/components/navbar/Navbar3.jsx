import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {SidebarData} from "../../staticdata/SidebarData";
import "./Navbar3.css";
import ProfileModal from "../modal/ProfileModal";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Switch from '@mui/material/Switch';
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SockJsClient from "react-stomp";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const SOCKET_URL = 'http://localhost:8080/ws-message';

const Navbar3 = ({
                     isLoggedIn,
                     passBackgroundColor,
                     passIsIssueAdded,
                     passIsIssueDeleted,
                     passIsIssueUpdated,
                     passPersons,
                     passSetIsIssueAdded,
                     passSetIsIssueUpdated,
                     passSetReceivedNewUserMessage,
                     passSetIsMessageAdded
                 }) => {
    const [sidebar, setSidebar] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const isLogged = localStorage.getItem("isLogged");
    const email = localStorage.getItem("email");
    const isBlocked = localStorage.getItem("isBlocked");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const userId = localStorage.getItem("userId");
    const isAdmin = "ROLE_ADMIN" === localStorage.getItem("role") ? true : false;
    const isUser = "ROLE_USER" === localStorage.getItem("role") ? true : false;
    const [isLightMode, setIsLightMode] = useState(true);
    const [desktopScreen, setDesktopScreen] = useState(window.innerWidth > 767);
    const [backgroundColor, setBackgroundColor] = useState(
        localStorage.getItem('dark_mode') ? localStorage.getItem("dark_mode") : "white"
    );

    const changeStateFromLocalStorage = () => {
        const dark_mode = localStorage.getItem("dark_mode");
        if (dark_mode !== null) {
            if (dark_mode === "#A9AAB4")
                setIsLightMode(false);
            else
                setIsLightMode(true);
        } else {
            setIsLightMode(true)
        }
    }

    const showSidebar = () => setSidebar(!sidebar);

    const handleChangeColor = () => {
        setIsLightMode((prev) => !prev);
        const newColor = backgroundColor === '#A9AAB4' ? 'white' : '#A9AAB4';
        console.log(backgroundColor)
        setBackgroundColor(newColor);
        passBackgroundColor(newColor);
        localStorage.setItem("dark_mode", newColor)
    }

    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
        changeStateFromLocalStorage();

        const handleResize = () => {
            setDesktopScreen(window.innerWidth > 767);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        console.log("isLoggedIn = ", isLoggedIn)
    }, [backgroundColor, isLoggedIn, JSON.parse(localStorage.getItem('isLogged')), isBlocked])

    const onConnected = () => {
        console.log("Connected!!!");
    };

    const onMessageReceived = (message) => {
        if (message.to !== undefined && message.to === email) {  // Mesaj transmis pentru toți utilizatorii
            passSetIsIssueAdded((prev) => !prev)  // Modificare variabilă sensibilă pentru actualizarea componentelor necesare
            passSetIsIssueUpdated((prev) => !prev) // Modificare variabilă sensibilă pentru actualizarea componentelor necesare
        } else if (message.fromEmail !== undefined && message.toEmail !== undefined) { // Mesaj transmis pentru participanții la chat
            if (message.fromEmail === email || message.toEmail === email) { // Actualizare chat dacă este destinat mesajul utizatorului logat
                if (!passPersons.some(item => item.email === message.fromEmail)) { // Pentru actualizarea listei de participanți pentru administrator
                    passSetReceivedNewUserMessage((prev) => !prev) // Modificare variabilă sensibilă pentru actualizarea componentelor necesare
                }
                passSetIsMessageAdded((prev) => !prev) // Modificare variabilă sensibilă pentru actualizarea componentelor necesare
            }
        }
    };

    return (
        <>
            {email !== null && <SockJsClient
                url={SOCKET_URL}
                topics={[
                    "/topic/message",
                    "/user/" + email + "/private",
                ]}
                onConnect={onConnected}
                onDisconnect={() => console.log("Disconnected!")}
                onMessage={(message) => onMessageReceived(message)}
            />}
            {/*<IconContext.Provider value={{color: "undefined"}}>*/}
            <div className="navbar" style={{backgroundColor: isAdmin ? "#E8D5C4" : "#AEBDCA"}}>
                <Link to="#" className="menu-bars">
                    {/*<FaIcons.FaBars onClick={showSidebar} style={{color: "black"}}/>*/}
                    <MenuIcon onClick={showSidebar} style={{color: "black", fontSize: "35px"}}/>
                </Link>
                {!isBlocked && <div style={{position: "absolute", marginLeft: desktopScreen ? "12rem" : "4rem"}}>
                    <Switch checked={isLightMode} style={{color: "white"}} color={isAdmin ? "warning" : "primary"}
                            icon={<ModeNightIcon/>}
                            checkedIcon={<LightModeIcon/>}
                            onClick={handleChangeColor}/>
                </div>}
                {((isLoggedIn || isLogged) && isUser) && !isBlocked && <button className="email"
                                                                               onClick={() => setModalShow(true)}
                >{firstName} {lastName}
                </button>}
                {isBlocked && <div className="admin">CONT BLOCAT</div>}
                {((isLoggedIn || isLogged) && isAdmin) && <div className="admin">ADMINISTRATOR</div>}
                {isUser && <ProfileModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    userId={userId}
                    passIsIssueAdded={passIsIssueAdded}
                    passIsIssueUpdated={passIsIssueUpdated}
                    passIsIssueDeleted={passIsIssueDeleted}
                    passBackgroundColor={backgroundColor}
                    passSetFirstName={setFirstName}
                    passSetLastName={setLastName}
                />}
            </div>
            <nav style={{backgroundColor: isAdmin ? "#E8D5C4" : "#AEBDCA"}}
                 className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li style={{backgroundColor: isAdmin ? "#E8D5C4" : "#AEBDCA"}} className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <CloseIcon style={{color: "black", fontSize: "35px"}}/>
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        if (isLogged && !isBlocked && item.title !== "Autentificare") {
                            if (isUser && item.title !== 'Cetățeni') {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path} style={{color: "black"}}>
                                            {item.icon}
                                            <span className="span" style={{color: "black"}}>{item.title}</span>
                                        </Link>
                                    </li>)
                            } else if (isAdmin && item.title !== 'Profil') {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path} style={{color: "black"}}>
                                            {item.icon}
                                            <span className="span" style={{color: "black"}}>{item.title}</span>
                                        </Link>
                                    </li>)
                            }
                        } else if (!isLogged && item.title !== "Deconectare" && item.title !== "Profil" && item.title !== "Cetățeni" && item.title !== "Chat") {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} style={{color: "black"}}>
                                        {item.icon}
                                        <span className="span" style={{color: "black"}}>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        }
                    })}
                    {isBlocked &&
                        <li key={8} className={"nav-text"}>
                            <Link to={"/login"} style={{color: "black"}}>
                                <VpnKeyIcon/>
                                <span className="span" style={{color: "black"}}>Deconectare</span>
                            </Link>
                        </li>}
                </ul>
            </nav>
            {/*</IconContext.Provider>*/}
        </>
    );
};

export default Navbar3;

