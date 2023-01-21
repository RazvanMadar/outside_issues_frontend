import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import CardItem2 from "../components/ui/CardItem2";
import {getIssues} from "../api/issue-api";
import {Button} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import classes from "./Issues.module.css";
import FilterMap from "../map-components/FilterMap";

const Issues = (props) => {
    // const issues_url = "http://localhost:8080/api/issues";
    const location = useLocation();

    const issues_url = location.state ? location.state : props.state;
    const [issues, setIssues] = useState([]);
    const [forbidden, setForbidden] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isIssueFiltered, setIsIssueFiltered] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState(false);

    const getAllIssues = () => {
        return getIssues("false", (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setIssues(result);
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    };

    useEffect(() => {
        console.log(issues_url);
        getAllIssues();
    }, [issues_url, isIssueFiltered]);

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
                    Filter issues
                </Button>
                <FilterMap
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    passIsIssueFiltered={setIsIssueFiltered}
                    passFilteredUsers={setFilteredUsers}
                />
            </div>
            <br/>
            {issues && (
                // <div
                //   style={{
                //     display: "flex",
                //     flexWrap: "wrap",
                //   }}
                // >
                <Row>
                    {issues.map((elem) => (
                        <Col key={elem.id}
                             className="bg-light border"
                            // style={{ margin: "0", padding: "0" }}
                        >
                            <CardItem2 issue={elem} key={elem.id}/>
                        </Col>
                    ))}
                </Row>
                // </div>
            )}
        </Container>
    );
};

export default Issues;
