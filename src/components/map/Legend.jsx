import React, {useEffect, useState} from "react";
import classes from "./Legend.module.css";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {filterIssues} from "../../api/issue-api";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ExtendedLegend from "./ExtendedLegend";

const Legend = ({passFilteredIssues, passBackgroundCol}) => {
    const [isExtended, setIsExtended] = useState(false);
    const [boldButton, setBoldButton] = useState(null);
    const [buttonId, setButtonId] = useState();
    const [type, setType] = useState(null);
    const [state, setState] = useState(null);
    const [all, setAll] = useState(false);

    const token = localStorage.getItem("token")

    const handleChangeState = (id) => {
        setBoldButton((previousId) => {
            if (previousId) {
                if (previousId.style !== undefined) {
                    document.getElementById(previousId).style.fontWeight = "normal";
                }
            }
            document.getElementById(id).style.fontWeight = "bold";
            setButtonId(id);
            return id;
        });
    };

    const getButtonStyle = (id) => {
        return {
            fontWeight: boldButton === id ? 'bold' : 'normal'
        };
    };

    const filterAllIssues = () => {
        return filterIssues(
            token,
            type,
            state,
            null,
            null,
            true,
            all,
            null,
            1000,
            null,
            null,
            (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log(result);
                    passFilteredIssues(result.content);
                } else {
                    console.log(err);
                }
            }
        );
    };

    useEffect(() => {
        filterAllIssues();
    }, [type, state, all]);

    return (
        <div>
            <div className={classes.wrapper}
                 style={{backgroundColor: passBackgroundCol === 'white' ? 'white' : "#BCBEC8"}}>
                <div className={classes.title}>Legendă</div>
                <div className={classes.field}>
                    <div className="w-3 h-3 opacity-90 rounded-full">
                        <AddCircleIcon className={classes.icon} onClick={() => {
                            // filterAllIssues("REGISTERED");
                            setType(null);
                            setState("REGISTERED");
                            handleChangeState("button1")
                        }}/>
                        <button id="button1" className={classes.legendText} style={getButtonStyle("button1")}
                                onClick={() => {
                                    // filterAllIssues("REGISTERED");
                                    setType(null);
                                    setState("REGISTERED");
                                    handleChangeState("button1");
                                }}>Înregistrată
                        </button>
                    </div>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <WatchLaterIcon className={classes.icon} onClick={() => {
                        // filterAllIssues("PLANNED");
                        setType(null);
                        setState("PLANNED");
                        handleChangeState("button2")
                    }}/>
                    <button id="button2" className={classes.legendText} style={getButtonStyle("button2")}
                            onClick={() => {
                                // filterAllIssues("PLANNED");
                                setType(null);
                                setState("PLANNED");
                                handleChangeState("button2");
                            }}>Planificată
                    </button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <BuildCircleIcon className={classes.icon} onClick={() => {
                        // filterAllIssues("WORKING");
                        setType(null);
                        setState("WORKING");
                        handleChangeState("button3")
                    }}/>
                    <button id="button3" className={classes.legendText} style={getButtonStyle("button3")}
                            onClick={() => {
                                // filterAllIssues("WORKING")
                                setType(null);
                                setState("WORKING");
                                handleChangeState("button3");
                            }}>În lucru
                    </button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <CheckCircleIcon className={classes.icon} onClick={() => {
                        // filterAllIssues("SOLVED");
                        setType(null);
                        setState("SOLVED");
                        handleChangeState("button5")
                    }}/>
                    <button id="button5" className={classes.legendText} style={getButtonStyle("button5")}
                            onClick={() => {
                                // filterAllIssues("SOLVED")
                                setType(null);
                                setState("SOLVED");
                                handleChangeState("button5")
                            }}>Rezolvată
                    </button>
                </div>
                <button className={classes.legendText} style={{marginTop: "2px", color: "blue"}}
                        onClick={() => setAll((prev) => !prev)}>
                    {!all ? "Ultimele 30 zile" : "Toate"}
                </button>
            </div>
            {isExtended ?
                <ExtendedLegend passSetIsExtended={setIsExtended} passFilteredIssues={passFilteredIssues} all={all}
                                passButtonId={buttonId} passSetButtonId={setButtonId} setType={setType} setState={setState}
                                passBackgroundCol={passBackgroundCol} passBoldButton={boldButton}
                                passSetBoldButton={setBoldButton}/>
                :
                <KeyboardDoubleArrowDownIcon style={{position: "absolute", right: "3.2rem", top: "14rem"}}
                                             onClick={() => setIsExtended(true)}/>
                // <div className={classes.arrow}>
                //     <span className={classes.spanArrow}></span>
                //     <span className={classes.spanArrow}></span>
                // </div>
            }
        </div>
    );
};

export default Legend;
