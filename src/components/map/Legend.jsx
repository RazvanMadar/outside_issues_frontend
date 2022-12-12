import React from "react";
import classes from "./Legend.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import plus from "../../pages/images/plus.png";
import redirected from "../../pages/images/arrow-r.png";

const Legend = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Issues Legend</div>
      <div className={classes.field}>
        <div className="w-3 h-3 opacity-90 rounded-full">
          {/* <AddCircleIcon className={classes.icon} /> */}
          <img
            src={plus}
            alt="Image not found!"
            style={{
              width: "20px",
              height: "20px",
              marginRight: "3px",
              marginLeft: "3px",
            }}
          />
          Registered
        </div>
      </div>
      <div className="w-3 h-3 opacity-90 rounded-full">
        <WatchLaterIcon className={classes.icon} />
        Planned
      </div>
      <div className="w-3 h-3 opacity-90 rounded-full">
        <BuildCircleIcon className={classes.icon} />
        Working
      </div>
      <div className="w-3 h-3 opacity-90 rounded-full">
        <ArrowCircleRightIcon className={classes.icon} />
        Redirected
      </div>
      <div className="w-3 h-3 opacity-90 rounded-full">
        <CheckCircleIcon className={classes.icon} />
        Solved
      </div>
    </div>
  );
};

export default Legend;
