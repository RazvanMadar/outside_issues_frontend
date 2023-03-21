import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import {findCitizenById} from "../api/citizen-api";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import ProfileChart from "../chart/ProfileChart";
import classes from "./ProfileModal.module.css";
import {data} from "../chart/data";
import CenterTemplate from "../chart/CenterTemplate";
import PieChart, {Connector, Label, Series} from "devextreme-react/pie-chart";
import StateChart from "../chart/StateChart";
import UserProfileChart from "./UserProfileChart";
import BasicChart from "../chart/BasicChart";
import {getBasicStatistics} from "../api/issue-api";
import {convertAPIStatesToUI} from "../common/utils";
import LoginB from "../components/bootstrap_login/LoginB";
import {AccountBox} from "../frontend_login/accountBox";

ChartJS.register(ArcElement, Tooltip, Legend)

const customizeLabel = (e) => {
    return `${e.argumentText}\n${e.valueText}`;
}

const ProfileModal = ({show, onHide, userId}) => {
    const [citizen, setCitizen] = useState(null);
    const [data, setData] = useState();
    const [desktopScreen, setDesktopScreen] = useState(false);
    const email = localStorage.getItem("email");

    const getStatistics = () => {
        return getBasicStatistics(email, (result, status, err) => {
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

    const findAnCitizenById = () => {
        return findCitizenById(userId, (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log("AICI ", result);
                    setCitizen(result)
                } else {
                    console.log(err);
                }
            }
        );
    };

    useEffect(() => {
        findAnCitizenById();
        getStatistics();

        const handleResize = () => {
            setDesktopScreen(window.innerWidth > 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [userId])


    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Profilul dumneavoastră
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    citizen ?
                        <div>
                            <div style={{display: "flex", flexDirection: "row"}} className={classes.container}>
                                <div className={classes.graphBox} style={{width: "50%", height: "50%"}}>
                                    <div className={classes.box}>
                                        Nume: {citizen.firstName} {citizen.lastName}
                                        <br/>
                                        Email: {citizen.email}
                                        <br/>
                                        Telefon: {citizen.phoneNumber}
                                        <br/>
                                        Bonus: 20 lei
                                    </div>
                                </div>
                                {desktopScreen ?
                                    <div>
                                        <BasicChart data={data}/>
                                    </div>
                                    : null
                                }
                            </div>
                            {!desktopScreen ?
                                <div>
                                    <BasicChart data={data}/>
                                </div>
                                : null
                            }
                        </div>
                        : ""
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained"
                        color="error"
                        className={classes.cancelButton}
                        onClick={onHide}>Ieșire
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
