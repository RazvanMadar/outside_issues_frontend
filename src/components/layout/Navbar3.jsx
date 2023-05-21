import React, {useEffect, useState} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import {SidebarData} from "./SidebarData";
import "./Navbar3.css";
import {IconContext} from "react-icons";
import ProfileModal from "../../profile/ProfileModal";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Switch from '@mui/material/Switch';
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SockJsClient from "react-stomp";

const SOCKET_URL = 'http://localhost:8080/ws-message';

const Navbar3 = ({
                     isLoggedIn,
                     passBackgroundColor,
                     passIsIssueAdded,
                     passIsIssueDeleted,
                     passIsIssueUpdated,
                     passSetIsIssueAdded,
                     passSetIsIssueDeleted,
                     passSetIsIssueUpdated,
                     passPersons,
                     passSetPersons,
                     passSetReceivedNewUserMessage,
                     passIsMessageAdded,
                     passSetIsMessageAdded
                 }) => {
    const [sidebar, setSidebar] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const isLogged = localStorage.getItem("isLogged");
    const email = localStorage.getItem("email");
    const isBlocked = localStorage.getItem("isBlocked");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
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
        console.log("S-a apelat din NAVBAR3")

        const handleResize = () => {
            setDesktopScreen(window.innerWidth > 767);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [backgroundColor, isLoggedIn, isBlocked])

    const onConnected = () => {
        console.log("Connected!!!");
    };

    const onMessageReceived = (msg) => {
        if (msg.to !== undefined) {
            if (msg.to === email) {
                passSetIsIssueAdded((prev) => !prev)
                passSetIsIssueUpdated((prev) => !prev)
            }
        } else if (msg.fromEmail !== undefined && msg.toEmail !== undefined) {
            if (msg.fromEmail === email || msg.toEmail === email) {
                if (!passPersons.some(item => item.email === msg.fromEmail)) {
                    passSetReceivedNewUserMessage((prev) => !prev)
                }
                // passIsIssueAdded((prev) => !prev);
                passSetIsMessageAdded((prev) => !prev);
                console.log(msg.message);
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
                onMessage={(msg) => onMessageReceived(msg)}
            />}
            <IconContext.Provider value={{color: "undefined"}}>
                <div className="navbar" style={{backgroundColor: isAdmin ? "#E8D5C4" : "#AEBDCA"}}>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} style={{color: "black"}}/>
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
                    />}
                </div>
                <nav style={{backgroundColor: isAdmin ? "#E8D5C4" : "#AEBDCA"}}
                     className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li style={{backgroundColor: isAdmin ? "#E8D5C4" : "#AEBDCA"}} className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose style={{color: "black"}}/>
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
            </IconContext.Provider>
        </>
    );
};

export default Navbar3;

