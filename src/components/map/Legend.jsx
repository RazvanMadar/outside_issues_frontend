import React, {useState} from "react";
import classes from "./Legend.module.css";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {filterIssues} from "../../api/issue-api";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ExtendedLegend from "./ExtendedLegend";

const Legend = ({passFilteredIssues}) => {
    const [isExtended, setIsExtended] = useState(false);
    const [boldButton, setBoldButton] = useState(null);
    const [buttonId, setButtonId] = useState();

    const handleChangeState = (id) => {
        setBoldButton((previousId) => {
            if (previousId) {
                document.getElementById(previousId).style.fontWeight = "normal";
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

    const filterAllIssues = (state) => {
        return filterIssues(
            null,
            state,
            null,
            null,
            true,
            null,
            null,
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

    return (
        <div>
            <div className={classes.wrapper}>
                <div className={classes.title}>Legendă</div>
                <div className={classes.field}>
                    <div className="w-3 h-3 opacity-90 rounded-full">
                        <AddCircleIcon className={classes.icon} onClick={() => {
                            filterAllIssues("REGISTERED");
                            handleChangeState("button1")
                        }}/>
                        <button id="button1" className={classes.legendText} style={getButtonStyle("button1")}
                                onClick={() => {
                                    filterAllIssues("REGISTERED");
                                    handleChangeState("button1");
                                }}>Înregistrată
                        </button>
                    </div>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <WatchLaterIcon className={classes.icon} onClick={() => {
                        filterAllIssues("PLANNED");
                        handleChangeState("button2")
                    }}/>
                    <button id="button2" className={classes.legendText} style={getButtonStyle("button2")}
                            onClick={() => {
                                filterAllIssues("PLANNED");
                                handleChangeState("button2");
                            }}>Planificată
                    </button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <BuildCircleIcon className={classes.icon} onClick={() => {
                        filterAllIssues("WORKING");
                        handleChangeState("button3")
                    }}/>
                    <button id="button3" className={classes.legendText}  style={getButtonStyle("button3")}
                            onClick={() => {
                                filterAllIssues("WORKING")
                                handleChangeState("button3");
                            }}>În lucru
                    </button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <ArrowCircleRightIcon className={classes.icon} onClick={() => {
                        filterAllIssues("REDIRECTED");
                        handleChangeState("button4")
                    }}/>
                    <button id="button4" className={classes.legendText}  style={getButtonStyle("button4")}
                            onClick={() => {
                                filterAllIssues("REDIRECTED")
                                handleChangeState("button4")
                            }}>Redirectată
                    </button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <CheckCircleIcon className={classes.icon} onClick={() => {
                        filterAllIssues("SOLVED");
                        handleChangeState("button5")
                    }}/>
                    <button id="button5" className={classes.legendText}  style={getButtonStyle("button5")}
                            onClick={() => {
                                filterAllIssues("SOLVED")
                                handleChangeState("button5")
                            }}>Rezolvată
                    </button>
                </div>
            </div>
            {isExtended ? <ExtendedLegend passSetIsExtended={setIsExtended} passFilteredIssues={passFilteredIssues} passButtonId={buttonId} passSetButtonId={setButtonId}/>
                :
                <KeyboardDoubleArrowDownIcon style={{position: "absolute", right: "3.7rem", top: "14.5rem"}}
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
