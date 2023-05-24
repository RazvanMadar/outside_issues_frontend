import React, { useState } from "react";
import { AccountContext } from "./accountContext";
import LoginMobile from "./LoginMobile";
import RegisterMobile from "./RegisterMobile";
import classes from "./Login.module.css";
import { motion } from "framer-motion";

const variants = {
    expanded: {
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)",
    },
    collapsed: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)",
    },
};

const transition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

const MobileForm = ({ onLogin }) => {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, transition.duration * 1000 - 1500);
    };

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 400);
    };

    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 400);
    };

    const contextValue = { switchToSignup, switchToSignin };

    return (
        <AccountContext.Provider value={contextValue}>
            <div className={classes.bigAuthContainer}>
                <div className={classes.bigSecondContainer}>
                    <motion.div
                        className={classes.drop}
                        initial={false}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        variants={variants}
                        transition={transition}
                    />
                    {active === "signin" && (
                        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                            <h2 className={classes.upperText}>Bine</h2>
                            <h2 className={classes.upperText}>ai revenit!</h2>
                            <h5 className={classes.bottomText}>Te rugăm să te autentifici!</h5>
                        </div>
                    )}
                    {active === "signup" && (
                        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                            <h2 className={classes.upperText}>Creare</h2>
                            <h2 className={classes.upperText}>cont</h2>
                            <h5 className={classes.bottomText}>Te rugăm să te înregistrezi!</h5>
                        </div>
                    )}
                </div>
                <div className={classes.footerContainer}>
                    {active === "signup" && <RegisterMobile onLogin={onLogin} />}
                    {active === "signin" && <LoginMobile onLogin={onLogin} />}
                </div>
            </div>
        </AccountContext.Provider>
    );
};

export default MobileForm;