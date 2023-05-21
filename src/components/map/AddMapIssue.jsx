import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import classes from "./AddMapIssue.module.css";
import AddForm from "./AddForm";

const AddMapIssue = ({passIsIssueAdded, markerPosition}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={classes.main}>
      {!isShown && (
        <Button
          variant="contained"
          startIcon={<AddLocationAltIcon style={{ color: "white" }} />}
          onClick={() => {
            setIsShown((val) => !val);
          }}
        >
          Înregistrează o sesizare
        </Button>
      )}
      {isShown && <AddForm passIsShown={setIsShown} passIsIssueAdded={passIsIssueAdded} markerPosition={markerPosition}/>}
    </div>
  );
};

export default AddMapIssue;
