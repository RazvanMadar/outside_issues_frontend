import * as React from 'react';
import {useEffect, useState} from 'react';
import classes from "./Citizens.module.css";
import {getCitizens} from "../api/citizen-api";
import {Button, Table} from 'reactstrap';
import EnhancedTable from "../components/citizen/EnhancedTable";
import {Navigate} from "react-router-dom";

const Citizens = ({passIsDeleted, passBackgroundColor}) => {
    const [citizens, setCitizens] = useState([]);
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    // const getAllCitizens = () => {
    //     return getCitizens((result, status, err) => {
    //             if (result !== null && status === 200) {
    //                 console.log(result);
    //                 setCitizens(result);
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //     );
    // };

    useEffect(() => {
        // getAllCitizens();
    }, [])

    return (
        <div style={{paddingTop: "55px"}}>
            {!isBlocked ? <EnhancedTable passIsDeleted={passIsDeleted} passBackgroundColor={passBackgroundColor}/> : <Navigate to={"/blocked"} replace/>}
        </div>
    );
}

export default Citizens;