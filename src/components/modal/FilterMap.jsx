import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {FormLabel, TextField} from "@mui/material";
import classes from "./FilterMap.module.css";
import {CategoryData} from "../../staticdata/CategoryData";
import {StateData} from "../../staticdata/StateData";
import {Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {filterIssues} from "../../api/issue-api";
import {convertUIStatesToAPI, convertUITypesToAPI, formatDate} from "../../common/utils";

const FilterMap = ({show, onHide, passFilteredIssues, passSetCurrentPage, passSetTotalPages, passIssuesPerPage, passSetIsFiltered, passSetType, passSetState, passSetFromDate, passSetToDate, passSort, passOrder, passBackgroundColor}) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const typeInputRef = useRef();
    const stateInputRef = useRef();
    let fromDateInputRef = useRef();
    const toDateInputRef = useRef();
    const token = localStorage.getItem("token");

    const filterAllIssues = () => {
        const enteredType = convertUITypesToAPI(typeInputRef.current.value);
        const enteredState = convertUIStatesToAPI(stateInputRef.current.value);
        const enteredFromDate = fromDateInputRef.current.value !== '' ? formatDate(fromDateInputRef.current.value) : null;
        const enteredToDate = toDateInputRef.current.value !== '' ? formatDate(toDateInputRef.current.value) : null;
        setFromDate(null)
        setToDate(null)
        return filterIssues(
            token,
            enteredType,
            enteredState,
            enteredFromDate,
            enteredToDate,
            false,
            true,
            0,
            passIssuesPerPage,
            passSort,
            passOrder,
            (result, status, err) => {
                if (result !== null && status === 200) {
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

    const closeHandle = () => {
        setFromDate(null)
        setToDate(null)
        onHide();
    };

    return (
        <Modal
            isOpen={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader style={{backgroundColor: passBackgroundColor}}>
                    Caută sesizările dorite
            </ModalHeader>
            <ModalBody style={{backgroundColor: passBackgroundColor}}>
                <Form style={{display: "flex", flexWrap: "wrap"}}>
                    <FormGroup className="mb-3" style={{width: "45%"}}>
                        <FormLabel>Categoria sesizării</FormLabel>
                        <Input style={{backgroundColor: passBackgroundColor}} type="select" name="category"
                               id="category" innerRef={typeInputRef}>
                            {CategoryData.map((cat) => <option key={cat.id}
                                                               style={{maxWidth: "1rem"}}>{cat.title}</option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup className="mb-3" style={{marginLeft: "2rem", width: "45%"}}>
                        <FormLabel>Starea sesizării</FormLabel>
                        <Input style={{backgroundColor: passBackgroundColor}} type="select" name="state" id="category"
                               innerRef={stateInputRef}>
                            {StateData.map((st) => <option key={st.id}
                                                           style={{maxWidth: "1rem"}}>{st.title}</option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disableFuture
                                label="Responsive"
                                label="Selectează data de început"
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
                                disableFuture
                                label="Responsive"
                                label="Selectează data de final"
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
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter style={{backgroundColor: passBackgroundColor, display: "flex", justifyContent: "space-between"}}>
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
                        onClick={closeHandle}>Închide
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default FilterMap;
