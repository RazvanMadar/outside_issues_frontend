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
import {filterIssues, getIssues} from "../api/issue-api";
import {convertUIStatesToAPI, convertUITypesToAPI} from "../common/utils";


const FilterMap = ({show, onHide, passIsIssueFiltered, passFilteredUsers}) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const typeInputRef = useRef();
    const stateInputRef = useRef();
    const fromDateInputRef = useRef();
    const toDateInputRef = useRef();

    const formatDate = (date) => {
        const correctDate = date.split('/');
        return `${correctDate[2]}-${correctDate[0]}-${correctDate[1]}`;
    }

    const filterAlIssues = () => {
        const enteredType = convertUITypesToAPI(typeInputRef.current.value);
        const enteredState = convertUIStatesToAPI(stateInputRef.current.value);
        const enteredFromDate = formatDate(fromDateInputRef.current.value);
        const enteredToDate = formatDate(toDateInputRef.current.value);
        return filterIssues(
            enteredType,
            enteredState,
            enteredFromDate,
            enteredToDate,
            (result, status, err) => {
                if (result !== null && status === 201) {
                    console.log(result);
                    passIsIssueFiltered((prev) => !prev);
                    passIsIssueFiltered(result);
                    // func(newUser);
                    // onClose();
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
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Search for issue
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" style={{width: "45%"}} controlId="exampleForm.ControlInput1">
                        <Form.Label>Issue Category</Form.Label>
                        <Input type="select" name="category" id="category" innerRef={typeInputRef}>
                            {CategoryData.map((cat) => <option key={cat.id}
                                                               style={{maxWidth: "1rem"}}>{cat.title}</option>)}
                        </Input>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{position: "absolute", top: "7%", right: "5%", width: "45%"}}
                                controlId="exampleForm.ControlInput1">
                        <Form.Label>Issue State</Form.Label>
                        <Input type="select" name="state" id="category" innerRef={stateInputRef}>
                            {StateData.map((st) => <option key={st.id} style={{maxWidth: "1rem"}}>{st.title}</option>)}
                        </Input>
                    </Form.Group>
                    <Form.Group>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disableFuture
                                label="Responsive"
                                label="Select from date"
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
                                label="Select to date"
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
            <Modal.Footer>
                <Button variant="contained"
                        color="success"
                        className={classes.filterButton}
                        onClick={() => {
                            filterAlIssues();
                            onHide()
                        }}>Filter
                </Button>
                <Button variant="contained"
                        color="error"
                        className={classes.cancelButton}
                        onClick={onHide}>Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterMap;
