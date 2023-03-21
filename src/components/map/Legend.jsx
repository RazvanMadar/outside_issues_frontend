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
                        <AddCircleIcon className={classes.icon} onClick={() => filterAllIssues("REGISTERED")}/>
                        <button className={classes.legendText}
                                onClick={() => filterAllIssues("REGISTERED")}>Înregistrată
                        </button>
                    </div>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <WatchLaterIcon className={classes.icon} onClick={() => filterAllIssues("PLANNED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("PLANNED")}>Planificată
                    </button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <BuildCircleIcon className={classes.icon} onClick={() => filterAllIssues("WORKING")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("WORKING")}>În lucru</button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <ArrowCircleRightIcon className={classes.icon} onClick={() => filterAllIssues("REDIRECTED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("REDIRECTED")}>Redirectată
                    </button>
                </div>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <CheckCircleIcon className={classes.icon} onClick={() => filterAllIssues("SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("SOLVED")}>Rezolvată</button>
                </div>
            </div>
            {isExtended ? <ExtendedLegend passSetIsExtended={setIsExtended} passFilteredIssues={passFilteredIssues}/>
                :
                <KeyboardDoubleArrowDownIcon style={{position: "absolute", right: "3.7rem", top: "14.5rem"}} onClick={() => setIsExtended(true)}/>
            // <div className={classes.arrow}>
            //     <span className={classes.spanArrow}></span>
            //     <span className={classes.spanArrow}></span>
            // </div>
            }
        </div>
    );
};

export default Legend;
