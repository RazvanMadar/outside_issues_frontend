import React, {useRef, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "@mui/material/Button";
import Form from 'react-bootstrap/Form';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TextField} from "@mui/material";
import classes from "./FilterMap.module.css";
import {CategoryData} from "../staticdata/CategoryData";
import {StateData} from "../staticdata/StateData";
import {Input} from "reactstrap";
import {filterIssues} from "../api/issue-api";
import {convertUIStatesToAPI, convertUITypesToAPI} from "../common/utils";


const FilterMap = ({show, onHide, passFilteredIssues, passSetCurrentPage, passSetTotalPages, passIssuesPerPage, passSetIsFiltered,
                       passSetType, passSetState, passSetFromDate, passSetToDate, passSort, passOrder, passBackgroundColor}) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const typeInputRef = useRef();
    const stateInputRef = useRef();
    const fromDateInputRef = useRef();
    const toDateInputRef = useRef();

    const token = localStorage.getItem("token");

    const formatDate = (date) => {
        const correctDate = date.split('/');
        return `${correctDate[2]}-${correctDate[0]}-${correctDate[1]}`;
    }

    const filterAllIssues = () => {
        const enteredType = convertUITypesToAPI(typeInputRef.current.value);
        const enteredState = convertUIStatesToAPI(stateInputRef.current.value);
        const enteredFromDate = fromDateInputRef.current.value !== '' ? formatDate(fromDateInputRef.current.value) : null;
        const enteredToDate = toDateInputRef.current.value !== '' ? formatDate(toDateInputRef.current.value) : null;
        console.log(enteredType, enteredState, enteredFromDate, enteredToDate)
        return filterIssues(
            token,
            enteredType,
            enteredState,
            enteredFromDate,
            enteredToDate,
            false,
            0,
            passIssuesPerPage,
            passSort,
            passOrder,
            (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log("AICI ", result);
                    passFilteredIssues(result.content)
                    passSetTotalPages(result.totalPages);
                    passSetCurrentPage(0);
                    passSetIsFiltered(true);
                    passSetType(enteredType);
                    passSetState(enteredState);
                    passSetFromDate(enteredFromDate);
                    passSetToDate(enteredToDate);
                } else {
                    console.log(err);
                }
            }
        );
    };

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{backgroundColor: passBackgroundColor}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Caută sesizările dorite
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: passBackgroundColor}}>
                <Form style={{ display: "flex", flexWrap: "wrap" }}>
                    <Form.Group className="mb-3" style={{width: "45%"}} controlId="exampleForm.ControlInput1">
                        <Form.Label>Categoria sesizării</Form.Label>
                        <Input style={{backgroundColor: passBackgroundColor}} type="select" name="category" id="category" innerRef={typeInputRef}>
                            {CategoryData.map((cat) => <option key={cat.id}
                                                               style={{maxWidth: "1rem"}}>{cat.title}</option>)}
                        </Input>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{marginLeft: "2rem", width: "45%"}}
                                controlId="exampleForm.ControlInput1">
                        <Form.Label>Starea sesizării</Form.Label>
                        <Input style={{backgroundColor: passBackgroundColor}} type="select" name="state" id="category" innerRef={stateInputRef}>
                            {StateData.map((st) => <option key={st.id}
                                                           style={{maxWidth: "1rem"}}>{st.title}</option>)}
                        </Input>
                    </Form.Group>
                    <Form.Group>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disableFuture
                                label="Responsive"
                                label="Selectează dată de început"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={fromDate}
                                onChange={(newDate) => {
                                    setFromDate(newDate);
                                }}
                                inputRef={fromDateInputRef}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className={classes.toDatePicker}
                                disableFuture
                                label="Responsive"
                                label="Selectează dată de final"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={toDate}
                                onChange={(newDate) => {
                                    setToDate(newDate);
                                }}
                                inputRef={toDateInputRef}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: passBackgroundColor}}>
                <Button variant="contained"
                        color="primary"
                        className={classes.filterButton}
                        onClick={() => {
                            filterAllIssues();
                            onHide()
                        }}>Filtrează
                </Button>
                <Button variant="contained"
                        color="error"
                        className={classes.cancelButton}
                        onClick={onHide}>Închide
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterMap;
