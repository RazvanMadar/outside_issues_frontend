import React from "react";
import Navbar from "./Navbar";
import Navbar3 from "./Navbar3";
import classes from "./NewLayout.module.css";
import NewNavbar2 from "./NewNavbar2";

function NewLayout(props) {
  return (
    <div className={classes.wrapper}>
      <Navbar />
      <div className={classes.main}>{props.children}</div>
    </div>
  );
}

export default NewLayout;
