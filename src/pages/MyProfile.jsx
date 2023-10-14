import {findCitizenById, updateCitizen} from "../api/citizen-api";
import React, {useEffect, useRef, useState} from "react";
import {Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {addCitizenImage, deleteCitizenImage, getCitizenImage} from "../api/citizen-image";
import {filterIssuesByCitizenEmail, getBasicStatistics} from "../api/issue-api";
import {convertAPIStatesToUI} from "../common/utils";
import SimpleArray from "../components/chart/SimpleArray";
import Pagination from "@mui/material/Pagination";
import ProfileIssueCard from "../components/issue/ProfileIssueCard";
import Button from "@mui/material/Button";
import ImageBoxProfile from "../components/imagebox/ImageBoxProfile";
import {Navigate} from "react-router-dom";
import {getAllRejectedForCitizen} from "../api/rejected-issues-api";
import JSONDataChart from "../components/chart/JSONDataChart";

const MyProfile = ({passIsDeleted, passIsUpdated, passBackgroundColor, passSetIsIssueUpdated}) => {
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email")
    const [citizen, setCitizen] = useState(null);
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [data, setData] = useState()
    const [data2, setData2] = useState()
    const [issues, setIssues] = useState([])
    const issuesPerPage = 4;
    const desktopScreen = window.innerWidth > 768;
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const sort = 'reportedDate';
    const order = 'desc';
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const token = localStorage.getItem("token");
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    const findCitizenDetailsById = () => {
        return findCitizenById(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                setCitizen(result);
            } else {

            }
        });
    };

    const getImage = () => {
        return getCitizenImage(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                setImage(URL.createObjectURL(result));
            } else {

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
            } else {

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
                    setIssues(result.content);
                    setTotalPages(result.totalPages);
                } else {

                }
            }
        );
    };

    const deleteImage = () => {
        return deleteCitizenImage(token, userId, (result, status, err) => {
                if (result !== null && status === 200) {}
                else {

                }
            }
        );
    };

    const addImage = () => {
        return addCitizenImage(userId, newImage, (result, status, err) => {
                if (result !== null && status === 201) {passSetIsIssueUpdated((prev) => !prev);}
                else {

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
                    if (newImage != null) {
                        deleteImage();
                        addImage();
                    }
                } else {

                }
            }
        );
    };

    const getAllRejectedIssuesForCitizen = () => {
        return getAllRejectedForCitizen(token, userId, email, (result, status, err) => {
                if (result !== null && status === 200) {
                    const second = {state: result[1].state, val2: result[1].val}
                    setData2([result[0], second]);
                } else {

                }
            }
        );
    };

    const changeThePage = (e, p) => {
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
                <div style={{paddingTop: "55px"}}>
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
                                           innerRef={firstNameInputRef} style={{backgroundColor: passBackgroundColor}}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Nume</Label>
                                    <Input type="text" name="lastname" id="lastName" defaultValue={citizen.lastName}
                                           innerRef={lastNameInputRef} style={{backgroundColor: passBackgroundColor}}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" defaultValue={citizen.email} disabled/>
                                </FormGroup>
                                <Button variant="contained"
                                        color="primary"
                                        onClick={updateAnCitizen}
                                >Actualizează profilul
                                </Button>
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
                                    <ProfileIssueCard issue={issue} passBackgroundColor={passBackgroundColor}/>
                                </Col>
                            ))}
                        </Row>
                    ) : ""}
                    <Pagination count={totalPages} showFirstButton showLastButton color="primary"
                                onChange={changeThePage} style={{marginLeft: "1rem", marginTop: "1rem"}}/>
                    <br/>
                </div>
        }
    </div>)
}

export default MyProfile;