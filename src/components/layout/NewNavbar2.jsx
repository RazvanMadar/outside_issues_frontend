import React, { Fragment, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./NewNavbar2.module.css";
import { Icon } from "react-icons-kit";

import { close } from "react-icons-kit/fa/close";
import { menu } from "react-icons-kit/feather/menu";
import { home } from "react-icons-kit/icomoon/home";
import { useState } from "react";
import axios from "axios";
import Issues from "../../pages/Issues";

const NewNavbar2 = () => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const navigate = useNavigate();

  const filterHandler = (e) => {
    const category = e.target.value;
    let url;
    category.length > 0
      ? (url = `http://localhost:8080/api/filter/${category}`)
      : (url = "http://localhost:8080/api/issues");
    navigate("/issues", { state: url });
  };

  return (
    <nav className="nav">
      <Link to="/">
        <Icon icon={home} size={28} />
      </Link>
      <form className="form-inline" style={{ margin: "5px" }}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={filterHandler}
        />
      </form>
      <div>
        <ul className={`${classes.navbar} ${toggle && classes.active}`}>
          <li>
            <NavLink to="/issues">Issues</NavLink>
          </li>
          <li>
            <NavLink activeclassename={classes.active} to="/map">
              Street map
            </NavLink>
          </li>
          <li>
            <NavLink
              // style={({ isActive }) => {
              //   return { color: isActive ? "#17cf97" : "" };
              // }}
              to="/add-issue"
            >
              Add issue
            </NavLink>
          </li>
          <li>
            <NavLink activeclassename={classes.active} to="/loginB">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.mobile} onClick={toggleHandler}>
        {toggle ? (
          <Icon icon={close} size={28} />
        ) : (
          <Icon icon={menu} size={28} />
        )}
      </div>
    </nav>
  );
};

export default NewNavbar2;
