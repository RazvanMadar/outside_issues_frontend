import React, {useEffect, useRef, useState} from "react";
import IssueCard from "../components/issue/IssueCard";
import {filterIssues} from "../api/issue-api";
import {Button} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import classes from "./Issues.module.css";
import FilterMap from "../components/modal/FilterMap";
import Pagination from '@mui/material/Pagination';
import {addCitizenReaction} from "../api/citizen-reactions-api";
import {Col, Container, Input, Row} from "reactstrap";
import {SortData} from "../staticdata/SortData";
import {convertUISortDataToAPI} from "../common/utils";
import Checkbox from "@mui/material/Checkbox";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import {Navigate} from "react-router-dom";

const Issues = ({passBackgroundColor, isDeleted, setIsDeleted, isUpdated, setIsUpdated, isAdded}) => {
    const [issues, setIssues] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const issuesPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);
    const [type, setType] = useState(null);
    const [state, setState] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const sortInputRef = useRef();
    const [sort, setSort] = useState('reported_date');
    const [order, setOrder] = useState('desc');
    const [orderAsc, setOrderAsc] = useState(false);
    const [orderDesc, setOrderDesc] = useState(true);
    const token = localStorage.getItem("token")
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    const filterAllIssues = () => {
        return filterIssues(
            token,
            type,
            state,
            fromDate,
            toDate,
            false,
            true,
            currentPage,
            issuesPerPage,
            sort,
            order,
            (result, status, err) => {
                if (result !== null && status === 200) {
                    setIssues(result.content);
                    setTotalPages(result.totalPages);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const addCitizensReactions = (reactions) => {
        return addCitizenReaction(token, reactions, (result, status, err) => {
            if (result !== null && status === 201) {}
            else {
                console.log(err);
            }
        });
    };

    const handleChangePage = (e, p) => {
        setCurrentPage(p - 1);
    }

    const handleOrderAsc = () => {
        if (!orderAsc) {
            setOrderAsc(true);
            setOrder('asc');
            setOrderDesc(false);
        }
    }

    const handleOrderDesc = () => {
        if (!orderDesc) {
            setOrderAsc(false);
            setOrder('desc');
            setOrderDesc(true);
        }
    }

    useEffect(() => {
        filterAllIssues();

        return () => {
            const allReactions = JSON.parse(localStorage.getItem("reactions")) || [];
            const reactionsToSend = [];
            allReactions.map((currentReaction) => {
                reactionsToSend.push(JSON.parse(currentReaction));
            });
            addCitizensReactions(reactionsToSend);
            localStorage.removeItem("reactions");
        }
    }, [currentPage, isFiltered, isDeleted, isUpdated, sort, order, isAdded]);

    return (
        <div style={{paddingTop: "55px"}}>
            {!isBlocked ?
                <Container>
                    <br/>
                    <div style={{backgroundColor: passBackgroundColor === 'white' ? 'white' : '#BCBEC8'}}
                         className={classes.filter}>
                        <Button
                            style={{margin: "1rem"}}
                            startIcon={<ManageSearchIcon style={{color: "white"}}/>}
                            variant="contained"
                            onClick={() => setModalShow(true)}
                        >
                            Filtrează sesizările
                        </Button>
                        Sortare după:
                        <div style={{display: "inline-block", margin: "1rem"}}>
                            <Input style={{backgroundColor: passBackgroundColor}} type="select" name="category"
                                   id="category" innerRef={sortInputRef}
                                   onChange={() => setSort(convertUISortDataToAPI(sortInputRef.current.value))}>
                                {SortData.map((data) => <option key={data.id}
                                                                style={{maxWidth: "1rem"}}>{data.title}</option>)}
                            </Input>
                        </div>
                        <Checkbox icon={<UploadOutlinedIcon/>} checkedIcon={<FileUploadIcon style={{color: "black"}}/>}
                                  checked={orderAsc} onClick={handleOrderAsc}/>
                        <Checkbox icon={<DownloadOutlinedIcon/>}
                                  checkedIcon={<FileDownloadIcon style={{color: "black"}}/>}
                                  checked={orderDesc} onClick={handleOrderDesc}/>
                        <FilterMap
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            passFilteredIssues={setIssues}
                            passSetCurrentPage={setCurrentPage}
                            passIssuesPerPage={issuesPerPage}
                            passSetTotalPages={setTotalPages}
                            passSetIsFiltered={setIsFiltered}
                            passSetType={setType}
                            passSetState={setState}
                            passSetFromDate={setFromDate}
                            passSetToDate={setToDate}
                            passSort={sort}
                            passOrder={order}
                            passBackgroundColor={passBackgroundColor}
                        />
                    </div>
                    <br/>
                    {issues.length > 0 ? (
                        <Row>
                            {issues.map((issue) => (
                                <Col key={issue.id}
                                     style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                                >
                                    <IssueCard issue={issue} passIsDeleted={setIsDeleted}
                                               passBackgroundColor={passBackgroundColor} passIsUpdated={setIsUpdated}/>
                                </Col>
                            ))}
                        </Row>
                    ) : ""}
                    <br/>
                    <Pagination count={totalPages} showFirstButton showLastButton color="primary"
                                onChange={handleChangePage}/>
                    <br/>
                </Container> : <Navigate to={"/blocked"} replace/>}
        </div>
    );
};

export default Issues;
