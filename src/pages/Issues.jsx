import React, {useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import CardItem2 from "../components/ui/CardItem2";
import {addIssue, filterIssues, getIssues} from "../api/issue-api";
import {Button} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import classes from "./Issues.module.css";
import FilterMap from "../map-components/FilterMap";
import Pagination from '@mui/material/Pagination';
import {AuthContext} from "../context/AuthContext";
import {addCitizenReaction} from "../api/citizen-reactions-api";

const Issues = (props) => {
    // const issues_url = "http://localhost:8080/api/issues";
    const location = useLocation();

    const issues_url = location.state ? location.state : props.state;
    const [issues, setIssues] = useState([]);
    const [forbidden, setForbidden] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [issuesPerPage, setIssuesPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [type, setType] = useState(null);
    const [state, setState] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [reactions, setReactions] = useState([]);


    const { isLogged, token, userId, login, logout } = useContext(AuthContext);

    const filterAllIssues = () => {
        return filterIssues(
            type,
            state,
            fromDate,
            toDate,
            false,
            currentPage,
            issuesPerPage,
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
    }, [issues_url, currentPage, isFiltered, isDeleted]);

    const handleChangePage = (e, p) => {
        setCurrentPage(p - 1);
    }

    //totalIssues % 2 === 0 ? Math.floor(totalIssues / 2) : Math.floor(totalIssues / 2 + 1)

    return (
        <Container>
            <br/>
            <div className={classes.filter}>
                <Button
                    style={{margin: "1rem"}}
                    startIcon={<ManageSearchIcon style={{color: "red"}}/>}
                    variant="contained"
                    onClick={() => setModalShow(true)}
                >
                    Filtrează sesizările
                </Button>
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
                />
            </div>
            <br/>
            {issues.length > 0 ? (
                <Row>
                    {issues.map((issue) => (
                        <Col key={issue.id}
                             className="bg-light border"
                             style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <CardItem2 issue={issue} passReactions={reactions} passSetReactions={setReactions} passIsDeleted={setIsDeleted} key={issue.id}/>
                        </Col>
                    ))}
                </Row>
            ) : ""}
            <br/>
            <Pagination count={totalPages} showFirstButton showLastButton color="primary" onChange={handleChangePage}/>
            <br/>
        </Container>
    );
};

export default Issues;
