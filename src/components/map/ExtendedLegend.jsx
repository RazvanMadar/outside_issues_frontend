import classes from "./Legend.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import React from "react";

const ExtendedLegend = ({passSetIsExtended, passButtonId, passSetButtonId, passBackgroundCol, passBoldButton, passSetBoldButton, setType, setState}) => {
    const changeActualState = (id) => {
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

    return (
        <div className={classes.extendedWrapper} style={{backgroundColor: passBackgroundCol === 'white' ? 'white' : "#BCBEC8"}}>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#063d91"}}
                                   onClick={() => {setType("ROAD"); setState("REGISTERED"); changeActualState("button6")
                    }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#063d91"}}
                                    onClick={() => {setType("ROAD"); setState("PLANNED"); changeActualState("button6")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#063d91"}}
                                     onClick={() => {setType("ROAD"); setState("WORKING"); changeActualState("button6")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#063d91"}}
                                     onClick={() => {setType("ROAD"); setState("SOLVED"); changeActualState("button6")
                                     }}/>
                    <button id="button6" style={getButtonStyle("button6")} className={classes.legendText}
                            onClick={() => {setType("ROAD"); setState(null); changeActualState("button6")
                            }}>Drumuri
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                   onClick={() => {setType("LIGHTNING"); setState("REGISTERED"); changeActualState("button7")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#f56802"}}
                                    onClick={() => {setType("LIGHTNING"); setState("PLANNED"); changeActualState("button7")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                     onClick={() => {setType("LIGHTNING"); setState("WORKING"); changeActualState("button7")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#f56802"}}
                                     onClick={() => {setType("LIGHTNING"); setState("SOLVED"); changeActualState("button7")
                                     }}/>
                    <button id="button7" style={getButtonStyle("button7")} className={classes.legendText}
                            onClick={() => {setType("LIGHTNING"); setState(null); changeActualState("button7")
                            }}>Iluminat
                        public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#339300"}}
                                   onClick={() => {setType("GREEN_SPACES"); setState("REGISTERED"); changeActualState("button8")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#339300"}}
                                    onClick={() => {setType("GREEN_SPACES"); setState("PLANNED"); changeActualState("button8")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#339300"}}
                                     onClick={() => {setType("GREEN_SPACES"); setState("WORKING"); changeActualState("button8")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#339300"}}
                                     onClick={() => {setType("GREEN_SPACES"); setState("SOLVED"); changeActualState("button8")
                                     }}/>
                    <button id="button8" style={getButtonStyle("button8")} className={classes.legendText}
                            onClick={() => {setType("GREEN_SPACES"); setState(null); changeActualState("button8")
                            }}>Spații verzi
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                   onClick={() => {setType("PUBLIC_DOMAIN"); setState("REGISTERED"); changeActualState("button9")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#78278d"}}
                                    onClick={() => {setType("PUBLIC_DOMAIN"); setState("PLANNED"); changeActualState("button9")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                     onClick={() => {setType("PUBLIC_DOMAIN"); setState("WORKING"); changeActualState("button9")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#78278d"}}
                                     onClick={() => {setType("PUBLIC_DOMAIN"); setState("SOLVED"); changeActualState("button9")
                                     }}/>
                    <button id="button9" style={getButtonStyle("button9")} className={classes.legendText}
                            onClick={() => {setType("PUBLIC_DOMAIN"); setState(null); changeActualState("button9")
                            }}>Domeniu public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                   onClick={() => {setType("PUBLIC_DISORDER"); setState("REGISTERED"); changeActualState("button10")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#f50202"}}
                                    onClick={() => {setType("PUBLIC_DISORDER"); setState("PLANNED"); changeActualState("button10")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                     onClick={() => {setType("PUBLIC_DISORDER"); setState("WORKING"); changeActualState("button10")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#f50202"}}
                                     onClick={() => {setType("PUBLIC_DISORDER"); setState("SOLVED"); changeActualState("button10")
                                     }}/>
                    <button id="button10" style={getButtonStyle("button10")} className={classes.legendText}
                            onClick={() => {setType("PUBLIC_DISORDER"); setState(null); changeActualState("button10")
                            }}>Ordine publică
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                   onClick={() => {setType("PUBLIC_TRANSPORT"); setState("REGISTERED"); changeActualState("button11")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                    onClick={() => {setType("PUBLIC_TRANSPORT"); setState("PLANNED"); changeActualState("button11")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                     onClick={() => {setType("PUBLIC_TRANSPORT"); setState("WORKING"); changeActualState("button11")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#0ad5d3"}}
                                     onClick={() => {setType("PUBLIC_TRANSPORT"); setState("SOLVED"); changeActualState("button11")
                                     }}/>
                    <button id="button11" style={getButtonStyle("button11")} className={classes.legendText}
                            onClick={() => {setType("PUBLIC_TRANSPORT"); setState(null); changeActualState("button11")
                            }}>Transport public
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                   onClick={() => {setType("BUILDINGS"); setState("REGISTERED"); changeActualState("button12")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#c88d13"}}
                                    onClick={() => {setType("BUILDINGS"); setState("PLANNED"); changeActualState("button12")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                     onClick={() => {setType("BUILDINGS"); setState("WORKING"); changeActualState("button12")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#c88d13"}}
                                     onClick={() => {setType("BUILDINGS"); setState("SOLVED"); changeActualState("button12")
                                     }}/>
                    <button id="button12" style={getButtonStyle("button12")} className={classes.legendText}
                            onClick={() => {setType("BUILDINGS"); setState(null); changeActualState("button12")
                            }}>Clădiri
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                   onClick={() => { setType("TRAFFIC_ROAD_SIGNS"); setState("REGISTERED"); changeActualState("button13")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#e700ff"}}
                                    onClick={() => {setType("TRAFFIC_ROAD_SIGNS"); setState("PLANNED"); changeActualState("button13")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                     onClick={() => {setType("TRAFFIC_ROAD_SIGNS"); setState("WORKING"); changeActualState("button13")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#e700ff"}}
                                     onClick={() => {setType("TRAFFIC_ROAD_SIGNS"); setState("SOLVED"); changeActualState("button13")
                                     }}/>
                    <button id="button13" style={getButtonStyle("button13")} className={classes.legendText}
                            onClick={() => {setType("TRAFFIC_ROAD_SIGNS"); setState(null); changeActualState("button13")
                            }}>Semne de circulație
                    </button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                   onClick={() => {setType("ANIMALS"); setState("REGISTERED"); changeActualState("button14")
                                   }}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#707b2c"}}
                                    onClick={() => {setType("ANIMALS"); setState("PLANNED"); changeActualState("button14")
                                    }}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                     onClick={() => {setType("ANIMALS"); setState("WORKING"); changeActualState("button14")
                                     }}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#707b2c"}}
                                     onClick={() => {setType("ANIMALS"); setState("SOLVED"); changeActualState("button14")
                                     }}/>
                    <button id="button14" style={getButtonStyle("button14")} className={classes.legendText}
                            onClick={() => {setType("ANIMALS"); setState(null); changeActualState("button14")
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