import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import classes from "../map-components/FilterMap.module.css";
import Button from "@mui/material/Button";
import {findCitizenById} from "../api/citizen-api";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import ProfileChart from "../chart/ProfileChart";

ChartJS.register(ArcElement, Tooltip, Legend)

const ProfileModal = ({show, onHide, userId}) => {
    const [citizen, setCitizen] = useState(null);
    const data = {
        labels: ['Înregistrată', 'Planificată', 'În lucru', 'Redirecționată', 'Rezolvată'],
        datasets: [{
            data: [1, 2, 3, 1, 2],
            backgroundColor: ['purple', 'yellow', 'blue', 'brown', 'green'],
            borderColor: ['purple', 'yellow', 'blue', 'brown', 'green']
        }]
    }

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
    }, [])

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
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div style={{width: "50%", height: "50%"}}>
                                Prenume: {citizen.firstName}
                                <br/>
                                Nume: {citizen.lastName}
                                <br/>
                                Email: {citizen.email}
                                <br/>
                                Telefon: {citizen.phoneNumber}
                                <br/>
                                Bonus: 20 lei
                            </div>
                            <div style={{width: "35%", height: "35%"}}>
                                <Doughnut data={data}/>
                            </div>
                            {/*<ProfileChart />*/}
                            <div>
                            </div>
                        </div> : ""
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