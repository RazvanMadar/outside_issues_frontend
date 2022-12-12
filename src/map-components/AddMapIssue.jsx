import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import classes from "./AddMapIssue.module.css";
import AddForm from "./AddForm";

const AddMapIssue = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={classes.main}>
      {!isShown && (
        <Button
          variant="contained"
          startIcon={<AddLocationAltIcon style={{ color: "red" }} />}
          onClick={() => {
            setIsShown((val) => !val);
          }}
        >
          Report issue
        </Button>
      )}
      {isShown && <AddForm passIsShown={setIsShown} />}
    </div>
  );
};

export default AddMapIssue;
