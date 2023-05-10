import classes from "./Legend.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import React, {useState} from "react";
import {filterIssues} from "../../api/issue-api";

const ExtendedLegend = ({passSetIsExtended, passFilteredIssues, passButtonId, passSetButtonId, passBackgroundCol, passBoldButton, passSetBoldButton}) => {
    const token = localStorage.getItem("token");

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

    const filterAllIssues = (type, state) => {
        return filterIssues(
            token,
            type,
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
        <div className={classes.extendedWrapper} style={{backgroundColor: passBackgroundCol === 'white' ? 'white' : "#BCBEC8"}}>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#063d91"}} onClick={() => {
                        filterAllIssues("ROAD", "REGISTERED");
                        handleChangeState("button6")
                    }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#063d91"}}
                                    onClick={() => {
                                        filterAllIssues("ROAD", "PLANNED")
                                        handleChangeState("button6")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#063d91"}}
                                     onClick={() => {
                                         filterAllIssues("ROAD", "WORKING")
                                         handleChangeState("button6")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#063d91"}}
                                     onClick={() => {
                                         filterAllIssues("ROAD", "SOLVED")
                                         handleChangeState("button6")
                                     }}/>
                    <button id="button6" style={getButtonStyle("button6")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("ROAD", null);
                                handleChangeState("button6")
                            }}>Drumuri
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                   onClick={() => {
                                       filterAllIssues("LIGHTNING", "REGISTERED")
                                       handleChangeState("button7")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#f56802"}}
                                    onClick={() => {
                                        filterAllIssues("LIGHTNING", "PLANNED")
                                        handleChangeState("button7")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                     onClick={() => {
                                         filterAllIssues("LIGHTNING", "WORKING")
                                         handleChangeState("button7")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                     onClick={() => {
                                         filterAllIssues("LIGHTNING", "SOLVED")
                                         handleChangeState("button7")
                                     }}/>
                    <button id="button7" style={getButtonStyle("button7")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("LIGHTNING", null)
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
                                       filterAllIssues("GREEN_SPACES", "REGISTERED")
                                       handleChangeState("button8")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#339300"}}
                                    onClick={() => {
                                        filterAllIssues("GREEN_SPACES", "PLANNED")
                                        handleChangeState("button8")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#339300"}}
                                     onClick={() => {
                                         filterAllIssues("GREEN_SPACES", "WORKING")
                                         handleChangeState("button8")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#339300"}}
                                     onClick={() => {
                                         filterAllIssues("GREEN_SPACES", "SOLVED")
                                         handleChangeState("button8")
                                     }}/>
                    <button id="button8" style={getButtonStyle("button8")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("GREEN_SPACES", null)
                                handleChangeState("button8")
                            }}>Spații
                        verzi
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                   onClick={() => {
                                       filterAllIssues("PUBLIC_DOMAIN", "REGISTERED")
                                       handleChangeState("button9")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#78278d"}}
                                    onClick={() => {
                                        filterAllIssues("PUBLIC_DOMAIN", "PLANNED")
                                        handleChangeState("button9")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                     onClick={() => {
                                         filterAllIssues("PUBLIC_DOMAIN", "WORKING")
                                         handleChangeState("button9")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                     onClick={() => {
                                         filterAllIssues("PUBLIC_DOMAIN", "SOLVED")
                                         handleChangeState("button9")
                                     }}/>
                    <button id="button9" style={getButtonStyle("button9")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("PUBLIC_DOMAIN", null)
                                handleChangeState("button9")
                            }}>Domeniu public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                   onClick={() => {
                                       filterAllIssues("PUBLIC_DISORDER", "REGISTERED")
                                       handleChangeState("button10")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#f50202"}}
                                    onClick={() => {
                                        filterAllIssues("PUBLIC_DISORDER", "PLANNED")
                                        handleChangeState("button10")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                     onClick={() => {
                                         filterAllIssues("PUBLIC_DISORDER", "WORKING")
                                         handleChangeState("button10")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                     onClick={() => {
                                         filterAllIssues("PUBLIC_DISORDER", "SOLVED")
                                         handleChangeState("button10")
                                     }}/>
                    <button id="button10" style={getButtonStyle("button10")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("PUBLIC_DISORDER", null)
                                handleChangeState("button10")
                            }}>Ordine publică
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                   onClick={() => {
                                       filterAllIssues("PUBLIC_TRANSPORT", "REGISTERED")
                                       handleChangeState("button11")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                    onClick={() => {
                                        filterAllIssues("PUBLIC_TRANSPORT", "PLANNED")
                                        handleChangeState("button11")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                     onClick={() => {
                                         filterAllIssues("PUBLIC_TRANSPORT", "WORKING")
                                         handleChangeState("button11")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                     onClick={() => {
                                         filterAllIssues("PUBLIC_TRANSPORT", "SOLVED")
                                         handleChangeState("button11")
                                     }}/>
                    <button id="button11" style={getButtonStyle("button11")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("PUBLIC_TRANSPORT", null)
                                handleChangeState("button11")
                            }}>Transport public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                   onClick={() => {
                                       filterAllIssues("BUILDINGS", "REGISTERED")
                                       handleChangeState("button12")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#c88d13"}}
                                    onClick={() => {
                                        filterAllIssues("BUILDINGS", "PLANNED")
                                        handleChangeState("button12")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                     onClick={() => {
                                         filterAllIssues("BUILDINGS", "WORKING")
                                         handleChangeState("button12")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                     onClick={() => {
                                         filterAllIssues("BUILDINGS", "SOLVED")
                                         handleChangeState("button12")
                                     }}/>
                    <button id="button12" style={getButtonStyle("button12")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("BUILDINGS", null)
                                handleChangeState("button12")
                            }}>Clădiri
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                   onClick={() => {
                                       filterAllIssues("TRAFFIC_ROAD_SIGNS", "REGISTERED")
                                       handleChangeState("button13")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#e700ff"}}
                                    onClick={() => {
                                        filterAllIssues("TRAFFIC_ROAD_SIGNS", "PLANNED")
                                        handleChangeState("button13")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                     onClick={() => {
                                         filterAllIssues("TRAFFIC_ROAD_SIGNS", "WORKING")
                                         handleChangeState("button13")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                     onClick={() => {
                                         filterAllIssues("TRAFFIC_ROAD_SIGNS", "SOLVED")
                                         handleChangeState("button13")
                                     }}/>
                    <button id="button13" style={getButtonStyle("button13")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("TRAFFIC_ROAD_SIGNS", null)
                                handleChangeState("button13")
                            }}>Semne de circulație
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                   onClick={() => {
                                       filterAllIssues("ANIMALS", "REGISTERED")
                                       handleChangeState("button14")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#707b2c"}}
                                    onClick={() => {
                                        filterAllIssues("ANIMALS", "PLANNED")
                                        handleChangeState("button14")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                     onClick={() => {
                                         filterAllIssues("ANIMALS", "WORKING")
                                         handleChangeState("button14")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                     onClick={() => {
                                         filterAllIssues("ANIMALS", "SOLVED")
                                         handleChangeState("button14")
                                     }}/>
                    <button id="button14" style={getButtonStyle("button14")} className={classes.legendText}
                            onClick={() => {
                                filterAllIssues("ANIMALS", null)
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