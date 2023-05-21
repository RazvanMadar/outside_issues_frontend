import classes from "./Legend.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import React, {useEffect, useState} from "react";
import {filterIssues} from "../../api/issue-api";

const ExtendedLegend = ({passSetIsExtended, passFilteredIssues, passButtonId, passSetButtonId, passBackgroundCol, passBoldButton, passSetBoldButton, all, setType, setState}) => {
    const token = localStorage.getItem("token");
    // const [type, setType] = useState(null);
    // const [state, setState] = useState(null);

    const handleChangeState = (id) => {
        if (passButtonId != null) {
            document.getElementById(passButtonId).style.fontWeight = "normal"
        }
        passSetBoldButton(() => {
            document.getElementById(id).style.fontWeight = "bold";
            passSetIsExtended(id);
            passSetButtonId(id);
            return id;
        });
    };

    const getButtonStyle = (id) => {
        return {
            fontWeight: passBoldButton === id ? 'bold' : 'normal'
        };
    };

    // const filterAllIssues = () => {
    //     return filterIssues(
    //         token,
    //         type,
    //         state,
    //         null,
    //         null,
    //         true,
    //         all,
    //         null,
    //         1000,
    //         null,
    //         null,
    //         (result, status, err) => {
    //             if (result !== null && status === 200) {
    //                 console.log(result);
    //                 passFilteredIssues(result.content);
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //     );
    // };
    //
    // useEffect(() => {
    //     filterAllIssues();
    // }, [type, state, all]);

    return (
        <div className={classes.extendedWrapper} style={{backgroundColor: passBackgroundCol === 'white' ? 'white' : "#BCBEC8"}}>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#063d91"}} onClick={() => {
                        // filterAllIssues("ROAD", "REGISTERED");
                        setType("ROAD");
                        setState("REGISTERED");
                        handleChangeState("button6")
                    }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#063d91"}}
                                    onClick={() => {
                                        // filterAllIssues("ROAD", "PLANNED")
                                        setType("ROAD");
                                        setState("PLANNED");
                                        handleChangeState("button6")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#063d91"}}
                                     onClick={() => {
                                         // filterAllIssues("ROAD", "WORKING")
                                         setType("ROAD");
                                         setState("WORKING");
                                         handleChangeState("button6")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#063d91"}}
                                     onClick={() => {
                                         // filterAllIssues("ROAD", "SOLVED")
                                         setType("ROAD");
                                         setState("SOLVED");
                                         handleChangeState("button6")
                                     }}/>
                    <button id="button6" style={getButtonStyle("button6")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("ROAD", null);
                                setType("ROAD");
                                setState(null);
                                handleChangeState("button6")
                            }}>Drumuri
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                   onClick={() => {
                                       // filterAllIssues("LIGHTNING", "REGISTERED")
                                       setType("LIGHTNING");
                                       setState("REGISTERED");
                                       handleChangeState("button7")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#f56802"}}
                                    onClick={() => {
                                        // filterAllIssues("LIGHTNING", "PLANNED")
                                        setType("LIGHTNING");
                                        setState("PLANNED");
                                        handleChangeState("button7")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                     onClick={() => {
                                         // filterAllIssues("LIGHTNING", "WORKING")
                                         setType("LIGHTNING");
                                         setState("WORKING");
                                         handleChangeState("button7")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                     onClick={() => {
                                         // filterAllIssues("LIGHTNING", "SOLVED")
                                         setType("LIGHTNING");
                                         setState("SOLVED");
                                         handleChangeState("button7")
                                     }}/>
                    <button id="button7" style={getButtonStyle("button7")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("LIGHTNING", null)
                                setType("LIGHTNING");
                                setState(null);
                                handleChangeState("button7")
                            }}>Iluminat
                        public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#339300"}}
                                   onClick={() => {
                                       // filterAllIssues("GREEN_SPACES", "REGISTERED")
                                       setType("GREEN_SPACES");
                                       setState("REGISTERED");
                                       handleChangeState("button8")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#339300"}}
                                    onClick={() => {
                                        // filterAllIssues("GREEN_SPACES", "PLANNED")
                                        setType("GREEN_SPACES");
                                        setState("PLANNED");
                                        handleChangeState("button8")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#339300"}}
                                     onClick={() => {
                                         // filterAllIssues("GREEN_SPACES", "WORKING")
                                         setType("GREEN_SPACES");
                                         setState("WORKING");
                                         handleChangeState("button8")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#339300"}}
                                     onClick={() => {
                                         // filterAllIssues("GREEN_SPACES", "SOLVED")
                                         setType("GREEN_SPACES");
                                         setState("SOLVED");
                                         handleChangeState("button8")
                                     }}/>
                    <button id="button8" style={getButtonStyle("button8")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("GREEN_SPACES", null)
                                setType("GREEN_SPACES");
                                setState(null);
                                handleChangeState("button8")
                            }}>Spații verzi
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                   onClick={() => {
                                       // filterAllIssues("PUBLIC_DOMAIN", "REGISTERED")
                                       setType("PUBLIC_DOMAIN");
                                       setState("REGISTERED");
                                       handleChangeState("button9")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#78278d"}}
                                    onClick={() => {
                                        // filterAllIssues("PUBLIC_DOMAIN", "PLANNED")
                                        setType("PUBLIC_DOMAIN");
                                        setState("PLANNED");
                                        handleChangeState("button9")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                     onClick={() => {
                                         // filterAllIssues("PUBLIC_DOMAIN", "WORKING")
                                         setType("PUBLIC_DOMAIN");
                                         setState("WORKING");
                                         handleChangeState("button9")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                     onClick={() => {
                                         // filterAllIssues("PUBLIC_DOMAIN", "SOLVED")
                                         setType("PUBLIC_DOMAIN");
                                         setState("SOLVED");
                                         handleChangeState("button9")
                                     }}/>
                    <button id="button9" style={getButtonStyle("button9")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("PUBLIC_DOMAIN", null)
                                setType("PUBLIC_DOMAIN");
                                setState(null);
                                handleChangeState("button9")
                            }}>Domeniu public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                   onClick={() => {
                                       // filterAllIssues("PUBLIC_DISORDER", "REGISTERED")
                                       setType("PUBLIC_DISORDER");
                                       setState("REGISTERED");
                                       handleChangeState("button10")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#f50202"}}
                                    onClick={() => {
                                        // filterAllIssues("PUBLIC_DISORDER", "PLANNED")
                                        setType("PUBLIC_DISORDER");
                                        setState("PLANNED");
                                        handleChangeState("button10")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                     onClick={() => {
                                         // filterAllIssues("PUBLIC_DISORDER", "WORKING")
                                         setType("PUBLIC_DISORDER");
                                         setState("WORKING");
                                         handleChangeState("button10")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                     onClick={() => {
                                         // filterAllIssues("PUBLIC_DISORDER", "SOLVED")
                                         setType("PUBLIC_DISORDER");
                                         setState("SOLVED");
                                         handleChangeState("button10")
                                     }}/>
                    <button id="button10" style={getButtonStyle("button10")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("PUBLIC_DISORDER", null)
                                setType("PUBLIC_DISORDER");
                                setState(null);
                                handleChangeState("button10")
                            }}>Ordine publică
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                   onClick={() => {
                                       // filterAllIssues("PUBLIC_TRANSPORT", "REGISTERED")
                                       setType("PUBLIC_TRANSPORT");
                                       setState("REGISTERED");
                                       handleChangeState("button11")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                    onClick={() => {
                                        // filterAllIssues("PUBLIC_TRANSPORT", "PLANNED")
                                        setType("PUBLIC_TRANSPORT");
                                        setState("PLANNED");
                                        handleChangeState("button11")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                     onClick={() => {
                                         // filterAllIssues("PUBLIC_TRANSPORT", "WORKING")
                                         setType("PUBLIC_TRANSPORT");
                                         setState("WORKING");
                                         handleChangeState("button11")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                     onClick={() => {
                                         // filterAllIssues("PUBLIC_TRANSPORT", "SOLVED")
                                         setType("PUBLIC_TRANSPORT");
                                         setState("SOLVED");
                                         handleChangeState("button11")
                                     }}/>
                    <button id="button11" style={getButtonStyle("button11")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("PUBLIC_TRANSPORT", null)
                                setType("PUBLIC_TRANSPORT");
                                setState(null);
                                handleChangeState("button11")
                            }}>Transport public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                   onClick={() => {
                                       // filterAllIssues("BUILDINGS", "REGISTERED")
                                       setType("BUILDINGS");
                                       setState("REGISTERED");
                                       handleChangeState("button12")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#c88d13"}}
                                    onClick={() => {
                                        // filterAllIssues("BUILDINGS", "PLANNED")
                                        setType("BUILDINGS");
                                        setState("PLANNED");
                                        handleChangeState("button12")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                     onClick={() => {
                                         // filterAllIssues("BUILDINGS", "WORKING")
                                         setType("BUILDINGS");
                                         setState("WORKING");
                                         handleChangeState("button12")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                     onClick={() => {
                                         // filterAllIssues("BUILDINGS", "SOLVED")
                                         setType("BUILDINGS");
                                         setState("SOLVED");
                                         handleChangeState("button12")
                                     }}/>
                    <button id="button12" style={getButtonStyle("button12")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("BUILDINGS", null)
                                setType("BUILDINGS");
                                setState(null);
                                handleChangeState("button12")
                            }}>Clădiri
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                   onClick={() => {
                                       // filterAllIssues("TRAFFIC_ROAD_SIGNS", "REGISTERED")
                                       setType("TRAFFIC_ROAD_SIGNS");
                                       setState("REGISTERED");
                                       handleChangeState("button13")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#e700ff"}}
                                    onClick={() => {
                                        // filterAllIssues("TRAFFIC_ROAD_SIGNS", "PLANNED")
                                        setType("TRAFFIC_ROAD_SIGNS");
                                        setState("PLANNED");
                                        handleChangeState("button13")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                     onClick={() => {
                                         // filterAllIssues("TRAFFIC_ROAD_SIGNS", "WORKING")
                                         setType("TRAFFIC_ROAD_SIGNS");
                                         setState("WORKING");
                                         handleChangeState("button13")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                     onClick={() => {
                                         // filterAllIssues("TRAFFIC_ROAD_SIGNS", "SOLVED")
                                         setType("TRAFFIC_ROAD_SIGNS");
                                         setState("SOLVED");
                                         handleChangeState("button13")
                                     }}/>
                    <button id="button13" style={getButtonStyle("button13")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("TRAFFIC_ROAD_SIGNS", null)
                                setType("TRAFFIC_ROAD_SIGNS");
                                setState(null);
                                handleChangeState("button13")
                            }}>Semne de circulație
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                   onClick={() => {
                                       // filterAllIssues("ANIMALS", "REGISTERED")
                                       setType("ANIMALS");
                                       setState("REGISTERED");
                                       handleChangeState("button14")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#707b2c"}}
                                    onClick={() => {
                                        // filterAllIssues("ANIMALS", "PLANNED")
                                        setType("ANIMALS");
                                        setState("PLANNED");
                                        handleChangeState("button14")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                     onClick={() => {
                                         // filterAllIssues("ANIMALS", "WORKING")
                                         setType("ANIMALS");
                                         setState("WORKING");
                                         handleChangeState("button14")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                     onClick={() => {
                                         // filterAllIssues("ANIMALS", "SOLVED")
                                         setType("ANIMALS");
                                         setState("SOLVED");
                                         handleChangeState("button14")
                                     }}/>
                    <button id="button14" style={getButtonStyle("button14")} className={classes.legendText}
                            onClick={() => {
                                // filterAllIssues("ANIMALS", null)
                                setType("ANIMALS");
                                setState(null);
                                handleChangeState("button14")
                            }}>Animale
                    </button>
                </div>
            </div>
            <KeyboardDoubleArrowUpIcon style={{position: "absolute", right: "7rem", top: "15.5rem"}}
                                       onClick={() => passSetIsExtended(false)}/>
        </div>
    );
}

export default ExtendedLegend;