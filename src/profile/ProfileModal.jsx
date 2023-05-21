import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import {findCitizenById} from "../api/citizen-api";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import classes from "./ProfileModal.module.css";
import BasicChart from "../chart/BasicChart";
import {getBasicStatistics, getTypeStatistics} from "../api/issue-api";
import {convertAPIStatesToUI, convertAPITypesToUI} from "../common/utils";
import noPhoto from "../pages/images/no_photo.png";
import {getCitizenImage} from "../api/citizen-image";

ChartJS.register(ArcElement, Tooltip, Legend)

const customizeLabel = (e) => {
    return `${e.argumentText}\n${e.valueText}`;
}

const ProfileModal = ({show, onHide, userId, passIsIssueAdded, passIsIssueDeleted, passIsIssueUpdated, passBackgroundColor}) => {
    const [citizen, setCitizen] = useState(null);
    const [data, setData] = useState();
    const [desktopScreen, setDesktopScreen] = useState(window.innerWidth > 991);
    const [image, setImage] = useState()
    const email = localStorage.getItem("email");

    const token = localStorage.getItem("token");

    const getAllTypesStatistics = () => {
        return getTypeStatistics(token, email,(result, status, err) => {
            if (status === 200 && result !== null) {
                result.forEach(res => {
                    res.state = convertAPITypesToUI(res.state);
                })
                setData(result);
            } else {
                console.log(err);
            }
        });
    };

    const findAnCitizenById = () => {
        return findCitizenById(token, userId, (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log("AICI ", result);
                    setCitizen(result)
                } else {
                    console.log(err);
                }
            }
        );
    };

    const getImage = () => {
        return getCitizenImage(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setImage(URL.createObjectURL(result));
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                setImage(noPhoto);
            }
        });
    };

    useEffect(() => {
        findAnCitizenById();
        getAllTypesStatistics();
        getImage();

        const handleResize = () => {
            setDesktopScreen(window.innerWidth > 991);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [userId, passIsIssueAdded, passIsIssueDeleted, passIsIssueUpdated])


    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{backgroundColor: passBackgroundColor}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Profilul dumneavoastră
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: passBackgroundColor}}>
                {
                    citizen ?
                        <div>
                            <div style={{
                                display: desktopScreen && "flex",
                                flexDirection: desktopScreen && "row",
                                justifyContent: desktopScreen && "center"
                            }}>
                                <div className={classes.graphBox} style={{width: "50%", height: "50%"}}>
                                    <div className={classes.box}>

                                         {/*AICI*/}
                                        <img alt="" style={{height: "15rem", width: "100%", borderRadius: "5%"}}
                                             src={image}/>
                                        <br/>
                                        <br/>
                                        Nume: {citizen.firstName} {citizen.lastName}
                                        <br/>
                                        Email: {citizen.email}
                                        <br/>
                                        Telefon: {citizen.phoneNumber}
                                    </div>
                                </div>
                                <BasicChart desktopScreen={desktopScreen} title={'Sesizările dumneavoastră'}
                                            data={data}/>

                            </div>
                        </div>
                        : ""
                }
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: passBackgroundColor}}>
                <Button variant="contained"
                        color="error"
                        className={classes.cancelButton}
                        onClick={onHide}>Închide
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
