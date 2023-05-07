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

const Navbar3 = ({isLoggedIn, passBackgroundColor, passIsIssueAdded, passIsIssueDeleted, passIsIssueUpdated}) => {
    const [sidebar, setSidebar] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const isLogged = localStorage.getItem("isLogged");
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
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
    }, [backgroundColor, isLoggedIn])


    return (
        <>
            <IconContext.Provider value={{color: "undefined"}}>
                <div className="navbar" style={{backgroundColor: role === "ROLE_ADMIN" ? "#E8D5C4" : "#AEBDCA"}}>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} style={{color: "black"}}/>
                    </Link>
                    <div style={{position: "absolute", marginLeft: desktopScreen ? "12rem" : "4rem"}}>
                        <Switch checked={isLightMode} style={{color: "white"}}
                                icon={<ModeNightIcon/>}
                                checkedIcon={<LightModeIcon/>}
                                onClick={handleChangeColor}/>
                    </div>
                    {((isLoggedIn || isLogged) && role == "ROLE_USER") && <button className="email"
                                                         onClick={() => setModalShow(true)}
                    >{firstName} {lastName}
                    </button>}
                    {((isLoggedIn || isLogged) && role == "ROLE_ADMIN") && <div className="admin">ADMINISTRATOR</div>}
                    <ProfileModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        userId={userId}
                        passIsIssueAdded={passIsIssueAdded}
                        passIsIssueUpdated={passIsIssueUpdated}
                        passIsIssueDeleted={passIsIssueDeleted}
                        passBackgroundColor={backgroundColor}
                    />
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose style={{color: "black"}}/>
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            if (isLogged && item.title !== "Autentificare") {
                                if (role === "ROLE_USER" && item.title !== 'Cetățeni') {
                                    console.log("a intrat aici", item.title)
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path} style={{color: "black"}}>
                                                {item.icon}
                                                <span className="span" style={{color: "black"}}>{item.title}</span>
                                            </Link>
                                        </li>)
                                }
                                else if (role === "ROLE_ADMIN" && item.title !== 'Profil') {
                                    return (
                                        <li key={index} className={item.cName} >
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
                            ;
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar3;

