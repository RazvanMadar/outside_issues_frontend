import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getCitizens} from "../../api/citizen-api";
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {addCitizenToBlacklist, deleteCitizenFromBlacklist, getBasicStatistics} from "../../api/blacklist-api";
import Button from "@mui/material/Button";
import BasicChart from "../chart/BasicChart";
import JSONDataChart from "../chart/JSONDataChart";
import {getAllRejected} from "../../api/rejected-issues-api";
import CitizensTableTop from "./CitizensTableTop";
import {getCurrentOrder, sortElementsByCriterion} from "../../common/utils";

const CitizensTable = ({passIsDeleted, passBackgroundColor}) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('email');
    const [citizens, setCitizens] = useState([]);
    const [citizensPerPage, setCitizensPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [newBlocked, setNewBlocked] = useState(false);
    const [newUnlocked, setNewUnblocked] = useState(false);
    const [data, setData] = useState();
    const [desktopScreen, setDesktopScreen] = useState(window.innerWidth > 878);
    const [rejected, setRejected] = useState();
    const emailInputRef = useRef();
    const token = localStorage.getItem("token");

    const getAllCitizens = () => {
        return getCitizens(token, emailInputRef != null ? emailInputRef.current.value : null, true, currentPage, citizensPerPage, (result, status, err) => {
                if (result !== null && status === 200) {
                    setCitizens(result.content);
                    setTotalElements(result.totalElements);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const getStatistics = () => {
        return getBasicStatistics(token, (result, status, err) => {
            if (status === 200 && result !== null) {
                setData(result);
            } else {
                console.log(err);
            }
        });
    };

    const getRejected = () => {
        return getAllRejected(token, (result, status, err) => {
            if (status === 200 && result !== null) {
                const second = {state: result[1].state, val2: result[1].val}
                setRejected([result[0], second]);
            } else {
                console.log(err);
            }
        });
    };

    const blockCitizen = (id) => {
        return addCitizenToBlacklist(token, id, (result, status, err) => {
                if (result !== null && status === 201) {
                    setNewBlocked((prev) => !prev);
                } else {
                    console.log(err);
                }
            }
        );
    }

    const unblockCitizen = (id) => {
        return deleteCitizenFromBlacklist(token, id, (result, status, err) => {
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
        getStatistics();
        getRejected();

        const handleResize = () => {
            setDesktopScreen(window.innerWidth > 878);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentPage, citizensPerPage, newBlocked, newUnlocked, passIsDeleted])

    const getRequestSort = (e, direction) => {
        const ascending = orderBy === direction && order === 'asc';
        setOrder(ascending ? 'desc' : 'asc');
        setOrderBy(direction);
    };

    const changeThePage = (e, p) => {
        setCurrentPage(p);
    };

    const changeTheRowsOnPage = (event) => {
        setCitizensPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <div style={{margin: "1rem 1rem 0 1rem"}}>
            <Box sx={{width: '100%'}}>
                <TextField id="outlined-basic" label="Căutați după email..." variant="outlined" style={{
                    width: "15%",
                    backgroundColor: passBackgroundColor === 'white' ? 'white' : "#BCBEC8"
                }}
                           inputRef={emailInputRef}/>
                <SearchIcon style={{marginTop: "5px", marginLeft: "5px"}} fontSize="large"
                            onClick={() => getAllCitizens()}/>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            style={{backgroundColor: passBackgroundColor === 'white' ? 'white' : "#BCBEC8"}}
                        >
                            <CitizensTableTop
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={getRequestSort}
                                rowCount={totalElements}
                            />
                            <TableBody style={{backgroundColor: passBackgroundColor === 'white' ? 'white' : "#BCBEC8"}}>
                                {sortElementsByCriterion(citizens, getCurrentOrder(order, orderBy))
                                    .map((row, idx) => {
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
                                                    id={idx}
                                                    scope="row"
                                                >
                                                    {row.email}
                                                </TableCell>
                                                <TableCell>{row.firstName}</TableCell>
                                                <TableCell>{row.lastName}</TableCell>
                                                <TableCell>{row.phoneNumber}</TableCell>
                                                <TableCell>{row.totalReported}</TableCell>
                                                <TableCell>{row.totalRejected}</TableCell>
                                                <TableCell>{!row.blocked ?
                                                    <Button variant="contained" color="error"
                                                            onClick={() => blockCitizen(row.id)}>
                                                        Blochează
                                                    </Button> :
                                                    <Button variant="outlined" color="success"
                                                            onClick={() => unblockCitizen(row.id)}>
                                                        Deblochează</Button>}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={totalElements}
                        rowsPerPage={citizensPerPage}
                        page={currentPage}
                        onPageChange={changeThePage}
                        onRowsPerPageChange={changeTheRowsOnPage}
                        style={{backgroundColor: passBackgroundColor === 'white' ? 'white' : "#BCBEC8"}}
                    />
                </Paper>
            </Box>
            <div style={{
                display: desktopScreen && "flex",
                flexDirection: desktopScreen && "row",
                justifyContent: desktopScreen && "center",
                marginBottom: "1rem"
            }}>
                <JSONDataChart desktopScreen={desktopScreen} data={rejected}/>
                <BasicChart title={'Grafic cetățeni blocați'} desktopScreen={desktopScreen} data={data}/>
            </div>
        </div>
    );
}

export default CitizensTable;
