import * as React from 'react';
import {useEffect, useState} from 'react';
import classes from "./Citizens.module.css";
import {getCitizens} from "../api/citizen-api";
import {Button, Table} from 'reactstrap';
import EnhancedTable from "../components/citizen/EnhancedTable";

const Citizens = ({passIsDeleted, passBackgroundColor}) => {
    const [citizens, setCitizens] = useState([]);

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
        <EnhancedTable passIsDeleted={passIsDeleted} passBackgroundColor={passBackgroundColor}/>
    );
}

export default Citizens;