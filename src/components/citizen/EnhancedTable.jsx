import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import {getCitizens} from "../../api/citizen-api";
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {addCitizenToBlacklist, deleteCitizenFromBlacklist, isCitizenBlocked} from "../../api/blacklist-api";
import Button from "@mui/material/Button";
import classes from "../ui/CardItem.module.css";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
    },
    {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'Prenume',
    },
    {
        id: 'lastName',
        numeric: false,
        disablePadding: true,
        label: 'Nume',
    },
    {
        id: 'phoneNumber',
        numeric: false,
        disablePadding: true,
        label: 'Nr tel',
    },
    {
        id: 'state',
        numeric: false,
        disablePadding: true,
        label: 'Stare',
    }
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('email');
    const [citizens, setCitizens] = useState([]);
    const [citizensPerPage, setCitizensPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [newBlocked, setNewBlocked] = useState(false);
    const [newUnlocked, setNewUnblocked] = useState(false);
    const emailInputRef = useRef();

    const getAllCitizens = () => {
        return getCitizens(emailInputRef != null ? emailInputRef.current.value : null, currentPage, citizensPerPage, (result, status, err) => {
                if (result !== null && status === 200) {
                    setCitizens(result.content);
                    setTotalElements(result.totalElements);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const addToBlacklist = (id) => {
        return addCitizenToBlacklist(id, (result, status, err) => {
                if (result !== null && status === 201) {

                } else {
                    console.log(err);
                }
            }
        );
    };

    const blockCitizenHandler = (id) => {
        return addCitizenToBlacklist(id, (result, status, err) => {
                if (result !== null && status === 201) {
                    setNewBlocked((prev) => !prev);
                } else {
                    console.log(err);
                }
            }
        );
    }

    const unblockCitizenHandler = (id) => {
        return deleteCitizenFromBlacklist(id, (result, status, err) => {
                if (result !== null && status === 200) {
                    setNewUnblocked((prev) => !prev);
                } else {
                    console.log(err);
                }
            }
        );
    }

    useEffect(() => {
        getAllCitizens();
    }, [currentPage, citizensPerPage, newBlocked, newUnlocked])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (e, p) => {
        setCurrentPage(p);
    };

    const handleChangeRowsPerPage = (event) => {
        setCitizensPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        currentPage > 0 ? Math.max(0, (1 + currentPage) * citizensPerPage - totalElements) : 0;

    return (
        <div style={{margin: "1rem 1rem 0 1rem"}}>
            <Box sx={{width: '100%'}}>
                <TextField id="outlined-basic" label="Căutați după email..." variant="outlined" style={{width: "15%"}}
                           inputRef={emailInputRef}/>
                <SearchIcon style={{marginTop: "5px", marginLeft: "5px"}} fontSize="large"
                            onClick={() => getAllCitizens()}/>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={totalElements}
                            />
                            <TableBody>
                                {stableSort(citizens, getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                <TableCell>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    // padding="none"
                                                >
                                                    {row.email}
                                                </TableCell>
                                                <TableCell padding="none">{row.firstName}</TableCell>
                                                <TableCell padding="none">{row.lastName}</TableCell>
                                                <TableCell padding="none">{row.phoneNumber}</TableCell>
                                                <TableCell padding="none">{!row.blocked ?
                                                    <Button variant="contained" color="error"
                                                            onClick={() => blockCitizenHandler(row.id)}>
                                                        Blochează
                                                    </Button> :
                                                    <Button variant="outlined" color="success"
                                                            onClick={() => unblockCitizenHandler(row.id)}>
                                                        Deblochează</Button>}
                                                    {row.firstName == null && row.lastName == null ?
                                                        <div
                                                        style={{position: "relative",
                                                            textAlign: "center",
                                                            fontWeight: "bold"}}
                                                        >Vizitator </div> : null}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalElements}
                        rowsPerPage={citizensPerPage}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
}