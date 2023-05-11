import AddIssue from "../components/issue/AddIssue";
import {Navigate} from "react-router-dom";
import React from "react";

const AddIssuePage = () => {
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    return (<div>
        {!isBlocked ? <AddIssue/> : <Navigate to={"/blocked"} replace/>}
    </div>);
};

export default AddIssuePage;
