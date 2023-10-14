import * as React from 'react';
import {Navigate} from "react-router-dom";
import CitizensTable from "../components/citizen/CitizensTable";

const Citizens = ({passIsDeleted, passBackgroundColor}) => {
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    return (
        <div style={{paddingTop: "55px"}}>
            {!isBlocked ? <CitizensTable passIsDeleted={passIsDeleted} passBackgroundColor={passBackgroundColor}/> : <Navigate to={"/blocked"} replace/>}
        </div>
    );
}

export default Citizens;