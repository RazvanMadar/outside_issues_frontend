import {findCitizenById, updateCitizen} from "../api/citizen-api";
import React, {useEffect, useRef, useState} from "react";
import {Form, FormGroup, Input, Label} from "reactstrap";
import {addCitizenImage, deleteCitizenImage, getCitizenImage} from "../api/citizen-image";
import {filterIssuesByCitizenEmail, getBasicStatistics} from "../api/issue-api";
import {convertAPIStatesToUI} from "../common/utils";
import SimpleArray from "../chart/SimpleArray";
import {Col, Row} from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import CardItem3 from "../components/ui/CardItem3";
import Button from "@mui/material/Button";
import ImageBoxProfile from "../map-components/ImageBoxProfile";
import {Navigate, useNavigate} from "react-router-dom";
import {getAllRejectedForCitizen} from "../api/rejected-issues-api";
import BasicChart from "../chart/BasicChart";
import JSONDataChart from "../chart/JSONDataChart";

const MyProfile = ({passIsDeleted, passIsUpdated, passBackgroundColor, passSetIsIssueUpdated}) => {
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email")
    const [citizen, setCitizen] = useState(null);
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [data, setData] = useState()
    const [data2, setData2] = useState()
    const [issues, setIssues] = useState([])
    const [issuesPerPage, setIssuesPerPage] = useState(4);
    const [desktopScreen, setDesktopScreen] = useState(window.innerWidth > 767);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState('reportedDate');
    const [order, setOrder] = useState('desc');
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    const findCitizenDetailsById = () => {
        return findCitizenById(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setCitizen(result);
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                console.log(err);
            }
        });
    };

    const getImage = () => {
        return getCitizenImage(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                setImage(URL.createObjectURL(result));
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                console.log(err)
            }
        });
    };

    const getStatistics = () => {
        return getBasicStatistics(token, email, (result, status, err) => {
            if (status === 200 && result !== null) {
                result.forEach(res => {
                    res.state = convertAPIStatesToUI(res.state);
                })
                setData(result);
                console.log(result);
            } else {
                console.log(err);
            }
        });
    };

    const filterCitizenIssues = () => {
        return filterIssuesByCitizenEmail(
            token,
            email,
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

    const deleteImage = () => {
        return deleteCitizenImage(token, userId, (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log("SUCCESS")
                } else {
                    console.log(err);
                }
            }
        );
    };

    const addImage = () => {
        return addCitizenImage(userId, newImage, (result, status, err) => {
                if (result !== null && status === 201) {
                    console.log(result)
                } else {
                    console.log(err);
                }
            }
        );
    };

    const updateAnCitizen = () => {
        return updateCitizen(
            token,
            {
                id: userId,
                email: email,
                firstName: firstNameInputRef.current.value,
                lastName: lastNameInputRef.current.value
            }, (result, status, err) => {
                if (result !== null && status === 201) {
                    console.log(result);
                    if (newImage != null) {
                        deleteImage();
                        addImage();
                    }
                    passSetIsIssueUpdated((prev) => !prev);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const getAllRejectedIssuesForCitizen = () => {
        return getAllRejectedForCitizen(token, userId, email, (result, status, err) => {
                if (result !== null && status === 200) {
                    const second = {state: result[1].state, val2: result[1].val}
                    setData2([result[0], second]);
                    // setData2(result);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const handleChangePage = (e, p) => {
        setCurrentPage(p - 1);
    }

    useEffect(() => {
        if (userId != null) {
            findCitizenDetailsById();
            getImage();
            getStatistics();
            getAllRejectedIssuesForCitizen();
        }
    }, [userId, passIsDeleted, passIsUpdated]);

    useEffect(() => {
        if (userId != null) {
            filterCitizenIssues();
        }
    }, [currentPage, passIsDeleted, passIsUpdated])

    return (<div>
        {isBlocked ? <Navigate to={"/blocked"} replace/> :
            citizen !== null &&
                <div>
                    <div style={{
                        margin: "1rem",
                        display: desktopScreen && "flex",
                        justifyContent: desktopScreen && "space-between",
                        alignItems: "center"
                    }}>
                        <div style={{width: desktopScreen && "45%"}}>
                            <Form>
                                <FormGroup>
                                    <Label for="firstName">Prenume</Label>
                                    <Input type="text" name="firstname" id="firstName" defaultValue={citizen.firstName}
                                           innerRef={firstNameInputRef}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Nume</Label>
                                    <Input type="text" name="lastname" id="lastName" defaultValue={citizen.lastName}
                                           innerRef={lastNameInputRef}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" defaultValue={citizen.email} disabled/>
                                </FormGroup>
                                <Button variant="contained"
                                        color="primary"
                                    // className={classes.filterButton}
                                        onClick={updateAnCitizen}
                                >Actualizează profilul
                                </Button>
                                {/*<Button variant="contained"*/}
                                {/*        color="error"*/}
                                {/*        onClick={() => navigate("/issues")}*/}
                                {/*>*/}
                                {/*    Ieșire*/}
                                {/*</Button>*/}
                            </Form>
                        </div>
                        <div
                            style={{
                                position: desktopScreen && "relative",
                                top: desktopScreen && "1rem",
                                right: desktopScreen && "1rem",
                                display: !desktopScreen && "flex",
                                justifyContent: !desktopScreen && "center",
                                marginTop: !desktopScreen && "1rem"
                            }}
                        >
                            <img
                                src={image != null ? image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                                alt="" width="350" height="350" style={{borderRadius: "50%"}}/>
                            {desktopScreen && <ImageBoxProfile passIsPhoto={setImage} passSetNewImage={setNewImage}
                                                               title={"Încărcați o poză cu dvs."}/>}
                        </div>
                        {!desktopScreen && <div style={{display: "flex", justifyContent: "center"}}>
                            <ImageBoxProfile passIsPhoto={setImage} passSetNewImage={setNewImage}
                                             title={"Încărcați o poză cu dvs."}/>
                        </div>}
                    </div>
                    <br/>
                    <div style={{
                        display: desktopScreen && "flex",
                        flexDirection: desktopScreen && "row",
                        justifyContent: "space-between",
                        margin: "1rem"
                    }}>
                        <SimpleArray data={data} desktopScreen={desktopScreen} title={"Grafic probleme raportate"}/>
                        <JSONDataChart data={data2} desktopScreen={desktopScreen}/>
                    </div>
                    <br/>
                    <p style={{marginLeft: "1rem", fontWeight: "bold"}}>Problemele raportate de dumneavoastră</p>
                    {issues.length > 0 ? (
                        <Row>
                            {issues.map((issue) => (
                                <Col key={issue.id}
                                     style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                                >
                                    <CardItem3 issue={issue} passBackgroundColor={passBackgroundColor}
                                               passIsUpdated={passIsUpdated}/>
                                </Col>
                            ))}
                        </Row>
                    ) : ""}
                    <Pagination count={totalPages} showFirstButton showLastButton color="primary"
                                onChange={handleChangePage} style={{marginLeft: "1rem", marginTop: "1rem"}}/>
                    <br/>
                </div>
        }
    </div>)
}

export default MyProfile;