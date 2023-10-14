import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {findCitizenById} from "../../api/citizen-api";
import classes from "./ProfileModal.module.css";
import BasicChart from "../chart/BasicChart";
import {getTypeStatistics} from "../../api/issue-api";
import {convertAPITypesToUI} from "../../common/utils";
import noPhoto from "../../pages/images/no_photo.png";
import {getCitizenImage} from "../../api/citizen-image";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const ProfileModal = ({show, onHide, userId, passIsIssueAdded, passIsIssueDeleted, passIsIssueUpdated, passBackgroundColor, passSetFirstName, passSetLastName}) => {
    const [citizen, setCitizen] = useState(null);
    const [data, setData] = useState();
    const [desktopScreen, setDesktopScreen] = useState(window.innerWidth > 991);
    const [image, setImage] = useState()
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    const getAllTypesStatistics = () => {
        return getTypeStatistics(token, email, (result, status, err) => {
            if (status === 200 && result !== null) {
                result.forEach(res => {
                    res.state = convertAPITypesToUI(res.state);
                })
                setData(result);
            } else {

            }
        });
    };

    const findAnCitizenById = () => {
        return findCitizenById(token, userId, (result, status, err) => {
                if (result !== null && status === 200) {
                    setCitizen(result)
                    passSetFirstName(result.firstName)
                    passSetLastName(result.lastName)
                } else {

                }
            }
        );
    };

    const getImage = () => {
        return getCitizenImage(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                setImage(URL.createObjectURL(result));
            } else {
                setImage(noPhoto);
            }
        });
    };

    useEffect(() => {
        findAnCitizenById();
        getAllTypesStatistics();
        getImage();

        const resizeComponent = () => {
            setDesktopScreen(window.innerWidth > 991);
        };

        window.addEventListener('resize', resizeComponent);

        return () => {
            window.removeEventListener('resize', resizeComponent);
        };
    }, [userId, passIsIssueAdded, passIsIssueDeleted, passIsIssueUpdated])


    return (
        <Modal
            isOpen={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader style={{backgroundColor: passBackgroundColor}}>
                Profilul dumneavoastră
            </ModalHeader>
            <ModalBody style={{backgroundColor: passBackgroundColor}}>
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
            </ModalBody>
            <ModalFooter style={{backgroundColor: passBackgroundColor}}>
                <Button variant="contained"
                        color="error"
                        className={classes.cancelButton}
                        onClick={onHide}>Închide
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ProfileModal;
