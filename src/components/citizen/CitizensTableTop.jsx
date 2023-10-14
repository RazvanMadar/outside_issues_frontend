import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {CitizensTableData} from "../../staticdata/CitizensTableData";
import TableSortLabel from "@mui/material/TableSortLabel";
import * as React from "react";

const CitizensTableTop = ({order, orderBy, onRequestSort}) => {
    const makeSort = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                </TableCell>
                {CitizensTableData.map((elem) => (
                    <TableCell
                        key={elem.id}
                        align={!elem.numeric ? 'left' : 'right'}
                        padding={!elem.disablePadding ? 'normal' : 'none'}
                        sortDirection={orderBy === elem.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === elem.id}
                            direction={orderBy === elem.id ? order : 'asc'}
                            onClick={makeSort(elem.id)}
                        >
                            {elem.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default CitizensTableTop;
