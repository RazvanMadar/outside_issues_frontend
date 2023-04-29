import {MDBTypography} from "mdb-react-ui-kit";
import React, {useEffect, useRef, useState} from "react";
import {getChatMessages, getLatestChatMessage} from "../../api/message-api";

const ChatPerson = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [latestMessage, setLatestMessage] = useState();
    const [fromImage, setFromImage] = useState();
    const [toImage, setToImage] = useState();
    const userId = localStorage.getItem("userId");

    const getElapsedTime = (date) => {
        if (latestMessage.message == null) {
            return "";
        }
        const past = new Date(date);
        const now = new Date();
        let elapsedTime = Math.floor((now - past) / 60000);
        let type = 0;
        let time = "minute";
        if (elapsedTime > 59) {
            elapsedTime /= 60;
            time = "ore";
            type = 1;
        }
        if (elapsedTime > 23 && type == 1) {
            elapsedTime /= 24;
            time = "zile";
            type = 2;
        }
        if (elapsedTime > 29 && type == 2) {
            elapsedTime /= 30;
            time = "luni";
            type = 3;
        }
        if (elapsedTime > 11 && type == 3) {
            elapsedTime /= 12;
            time = "ani";
        }
        return Math.floor(elapsedTime) + " " + time;
    }

    // Citizen POV
    const getAllChatMessages = () => {
        return getChatMessages(userId, 14, (result, status, err) => {
                if (result !== null && status === 200) {
                    setMessages(result);
                } else {
                    console.log(err);
                }
            }
        );
    };

    // Citizen POV
    const getLatestMessage = () => {
        return getLatestChatMessage(userId, 14, (result, status, err) => {
                if (result !== null && status === 200) {
                    setLatestMessage(result);
                } else {
                    console.log(err);
                }
            }
        );
    };

    useEffect(() => {

    }, []);


    return (<div style={{position: "relative", height: "400px", overflowY: "auto"}}>

        <MDBTypography listUnStyled className="mb-0">
            <li className="p-2 border-bottom">
                <a
                    href="#!"
                    className="d-flex justify-content-between"
                >
                    <div className="d-flex flex-row">
                        <div>
                            <img
                                src={toImage}
                                style={{borderRadius: "50%"}}
                                alt=""
                                className="d-flex align-self-center me-3"
                                width="60"
                                height="60"
                            />
                        </div>
                        <div className="pt-1">
                            <p className="fw-bold mb-0">Răzvan Madar</p>
                            <p className="small text-muted">
                                {latestMessage != null && latestMessage.message != null ? latestMessage.message : "Nu aveți mesaje."}
                            </p>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="small text-muted mb-1">
                            {latestMessage != null && getElapsedTime(latestMessage.date)}
                        </p>
                        <span
                            className="badge bg-danger rounded-pill float-end">
                                2
                              </span>
                    </div>
                </a>
            </li>
        </MDBTypography>

    </div>)
}

export default ChatPerson;