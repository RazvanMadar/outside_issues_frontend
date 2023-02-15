import React, {useContext, useState} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from "react-router-dom";
import {SidebarData} from "./SidebarData";
import "./Navbar3.css";
import {IconContext} from "react-icons";
import {AuthContext} from "../../context/AuthContext";

const Navbar3 = () => {
    const [sidebar, setSidebar] = useState(false);
    // const {isLogged, token} = useContext(AuthContext);
    const isLogged = localStorage.getItem("isLogged");

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{color: "undefined"}}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            if (isLogged && item.title !== "Autentificare") {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className="span">{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            } else if (!isLogged && item.title !== "Deconectare") {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className="span">{item.title}</span>
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
