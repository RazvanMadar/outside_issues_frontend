import React, {useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CardItem2 from "../components/ui/CardItem2";
import {filterIssues} from "../api/issue-api";
import {Button} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import classes from "./Issues.module.css";
import FilterMap from "../map-components/FilterMap";
import Pagination from '@mui/material/Pagination';
import {addCitizenReaction} from "../api/citizen-reactions-api";
import {Input} from "reactstrap";
import {SortData} from "../staticdata/SortData";
import {convertUISortDataToAPI} from "../common/utils";
import Checkbox from "@mui/material/Checkbox";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import {useLocation} from "react-router-dom";

const SOCKET_URL = 'http://localhost:8080/ws-message';

const Issues = ({url, passBackgroundColor, isDeleted, setIsDeleted}) => {
    // const issues_url = "http://localhost:8080/api/issues";
    const location = useLocation();
    const issues_url = location.state ? location.state : url;
    const [issues, setIssues] = useState([]);
    const [forbidden, setForbidden] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [issuesPerPage, setIssuesPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);
    // const [isDeleted, setIsDeleted] = useState(false);
    const [type, setType] = useState(null);
    const [state, setState] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [reactions, setReactions] = useState([]);
    const sortInputRef = useRef();
    const orderInputRef = useRef();
    const [sort, setSort] = useState('reported_date');
    const [order, setOrder] = useState('desc');
    const [orderAsc, setOrderAsc] = useState(false);
    const [orderDesc, setOrderDesc] = useState(true);

    console.log(passBackgroundColor);;

    const filterAllIssues = () => {
        return filterIssues(
            type,
            state,
            fromDate,
            toDate,
            false,
            currentPage,
            issuesPerPage,
            sort,
            order,
            (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log(result.content);
                    setIssues(result.content);
                    setTotalPages(result.totalPages);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const addCitizensReactions = (reactions) => {
        return addCitizenReaction(reactions, (result, status, err) => {
            if (result !== null && status === 201) {
                console.log(result);
            } else if (status === 403) {
                setForbidden(true);
            } else {
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
    }, [issues_url, currentPage, isFiltered, isDeleted, sort, order]);


    return (
        // style={{backgroundColor: "grey"}}
        <div>

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
                        <Input style={{backgroundColor: passBackgroundColor}} type="select" name="category" id="category" innerRef={sortInputRef}
                               onChange={() => setSort(convertUISortDataToAPI(sortInputRef.current.value))}>
                            {SortData.map((data) => <option key={data.id}
                                                            style={{maxWidth: "1rem"}}>{data.title}</option>)}
                        </Input>
                    </div>
                    <Checkbox icon={<UploadOutlinedIcon/>} checkedIcon={<FileUploadIcon style={{color: "black"}}/>}
                              checked={orderAsc} onClick={handleOrderAsc}/>
                    <Checkbox icon={<DownloadOutlinedIcon/>} checkedIcon={<FileDownloadIcon style={{color: "black"}}/>}
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
                                 // className="bg-light border"
                                 style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                            >
                                <CardItem2 issue={issue} passReactions={reactions} passSetReactions={setReactions}
                                           passIsDeleted={setIsDeleted} passBackgroundColor={passBackgroundColor} key={issue.id}/>
                            </Col>
                        ))}
                    </Row>
                ) : ""}
                <br/>
                <Pagination count={totalPages} showFirstButton showLastButton color="primary"
                            onChange={handleChangePage}/>
                <br/>
            </Container>
        </div>
    );
};

export default Issues;
