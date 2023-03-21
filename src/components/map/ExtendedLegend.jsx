import classes from "./Legend.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import React from "react";
import {filterIssues} from "../../api/issue-api";

const ExtendedLegend = ({passSetIsExtended, passFilteredIssues}) => {
    const filterAllIssues = (type, state) => {
        return filterIssues(
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
        <div className={classes.extendedWrapper}>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "blue"}} onClick={() => filterAllIssues("ROAD", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "blue"}} onClick={() => filterAllIssues("ROAD", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "blue"}} onClick={() => filterAllIssues("ROAD", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "blue"}} onClick={() => filterAllIssues("ROAD", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "blue"}} onClick={() => filterAllIssues("ROAD", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("ROAD", null)}>Drumuri</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "orange"}} onClick={() => filterAllIssues("LIGHTNING", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "orange"}} onClick={() => filterAllIssues("LIGHTNING", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "orange"}} onClick={() => filterAllIssues("LIGHTNING", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "orange"}} onClick={() => filterAllIssues("LIGHTNING", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "orange"}} onClick={() => filterAllIssues("LIGHTNING", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("LIGHTNING", null)}>Iluminat public</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "green"}} onClick={() => filterAllIssues("GREEN_SPACES", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "green"}} onClick={() => filterAllIssues("GREEN_SPACES", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "green"}} onClick={() => filterAllIssues("GREEN_SPACES", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "green"}} onClick={() => filterAllIssues("GREEN_SPACES", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "green"}} onClick={() => filterAllIssues("GREEN_SPACES", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("GREEN_SPACES", null)}>Spații verzi</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "purple"}} onClick={() => filterAllIssues("PUBLIC_DOMAIN", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "purple"}} onClick={() => filterAllIssues("PUBLIC_DOMAIN", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "purple"}} onClick={() => filterAllIssues("PUBLIC_DOMAIN", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "purple"}} onClick={() => filterAllIssues("PUBLIC_DOMAIN", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "purple"}} onClick={() => filterAllIssues("PUBLIC_DOMAIN", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("PUBLIC_DOMAIN", null)}>Domeniu public</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "red"}} onClick={() => filterAllIssues("PUBLIC_DISORDER", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "red"}} onClick={() => filterAllIssues("PUBLIC_DISORDER", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "red"}} onClick={() => filterAllIssues("PUBLIC_DISORDER", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "red"}} onClick={() => filterAllIssues("PUBLIC_DISORDER", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "red"}} onClick={() => filterAllIssues("PUBLIC_DISORDER", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("PUBLIC_DISORDER", null)}>Ordine publică</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "turquoise"}} onClick={() => filterAllIssues("PUBLIC_TRANSPORT", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "turquoise"}} onClick={() => filterAllIssues("PUBLIC_TRANSPORT", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "turquoise"}} onClick={() => filterAllIssues("PUBLIC_TRANSPORT", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "turquoise"}} onClick={() => filterAllIssues("PUBLIC_TRANSPORT", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "turquoise"}} onClick={() => filterAllIssues("PUBLIC_TRANSPORT", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("PUBLIC_TRANSPORT", null)}>Transport public</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "#F1C40F"}} onClick={() => filterAllIssues("BUILDINGS", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "#F1C40F"}} onClick={() => filterAllIssues("BUILDINGS", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "#F1C40F"}} onClick={() => filterAllIssues("BUILDINGS", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "#F1C40F"}} onClick={() => filterAllIssues("BUILDINGS", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "#F1C40F"}} onClick={() => filterAllIssues("BUILDINGS", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("BUILDINGS", null)}>Clădiri</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "fuchsia"}} onClick={() => filterAllIssues("TRAFFIC_ROAD_SIGNS", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "fuchsia"}} onClick={() => filterAllIssues("TRAFFIC_ROAD_SIGNS", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "fuchsia"}} onClick={() => filterAllIssues("TRAFFIC_ROAD_SIGNS", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "fuchsia"}} onClick={() => filterAllIssues("TRAFFIC_ROAD_SIGNS", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "fuchsia"}} onClick={() => filterAllIssues("TRAFFIC_ROAD_SIGNS", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("TRAFFIC_ROAD_SIGNS", null)}>Semne de circulație</button>
                </div>
            </div>
            <div className={classes.field}>
                <div className="w-3 h-3 opacity-90 rounded-full">
                    <AddCircleIcon className={classes.icon} style={{color: "olive"}} onClick={() => filterAllIssues("ANIMALS", "REGISTERED")}/>
                    <WatchLaterIcon className={classes.icon} style={{color: "olive"}} onClick={() => filterAllIssues("ANIMALS", "PLANNED")}/>
                    <BuildCircleIcon className={classes.icon} style={{color: "olive"}} onClick={() => filterAllIssues("ANIMALS", "WORKING")}/>
                    <ArrowCircleRightIcon className={classes.icon} style={{color: "olive"}} onClick={() => filterAllIssues("ANIMALS", "REDIRECTED")}/>
                    <CheckCircleIcon className={classes.icon} style={{color: "olive"}} onClick={() => filterAllIssues("ANIMALS", "SOLVED")}/>
                    <button className={classes.legendText} onClick={() => filterAllIssues("ANIMALS", null)}>Animale</button>
                </div>
            </div>
            <KeyboardDoubleArrowUpIcon style={{position: "absolute", right: "8rem", top: "15.5rem"}} onClick={() => passSetIsExtended(false)}/>
        </div>
    );
}

export default ExtendedLegend;