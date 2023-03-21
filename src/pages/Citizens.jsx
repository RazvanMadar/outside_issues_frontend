import * as React from 'react';
import {useEffect, useState} from 'react';
import classes from "./Citizens.module.css";
import {getCitizens} from "../api/citizen-api";
import {Button, Table} from 'reactstrap';
import EnhancedTable from "../components/citizen/EnhancedTable";

const Citizens = () => {
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
        // <div className={classes.graphBox}>
        //     <div className={classes.box}>
        // <div style={{
        //     position: "absolute",
        //     left: "50%",
        //     top: "50%",
        //     transform: "translate(-50%, -50%)",
        //     backgroundColor: "white",
        //     boxShadow: "0 7px 25px rgba(0, 0, 0, 0.08)",
        //     borderRadius: "20px",
        //     padding: "20px",
        //     // width: "80%"
        // }}>
        //     <Table>
        //         <thead>
        //         <tr>
        //             <th>Prenume</th>
        //             <th>Nume</th>
        //             <th>Email</th>
        //             <th>Telefon</th>
        //             <th>Blochează cetățeanul</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {citizens ? citizens.map((citizen) =>
        //             <tr key={citizen.id}>
        //                 <td>{citizen.firstName}</td>
        //                 <td>{citizen.lastName}</td>
        //                 <td>{citizen.email}</td>
        //                 <td>{citizen.phoneNumber}</td>
        //                 <td><Button color="danger" onClick={() => console.log(`blocheza ${citizen.id}`)}>
        //                     Blochează
        //                 </Button>
        //                     {citizen.firstName == null || citizen.lastName == null || citizen.phoneNumber == null ?
        //                         <Button color="primary">
        //                             Vizitator
        //                         </Button> : ""}
        //                 </td>
        //             </tr>
        //         ) : ""}
        //         </tbody>
        //     </Table>
        //     {/*    </div>*/}
        //     {/*</div>*/}
        // </div>
        <EnhancedTable />
    );
}

export default Citizens;