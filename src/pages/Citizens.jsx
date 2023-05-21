import * as React from 'react';
import EnhancedTable from "../components/citizen/EnhancedTable";
import {Navigate} from "react-router-dom";

const Citizens = ({passIsDeleted, passBackgroundColor}) => {
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    return (
        <div style={{paddingTop: "55px"}}>
            {!isBlocked ? <EnhancedTable passIsDeleted={passIsDeleted} passBackgroundColor={passBackgroundColor}/> : <Navigate to={"/blocked"} replace/>}
        </div>
    );
}

export default Citizens;