import {MDBTypography} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import {getLatestChatMessage} from "../../api/message-api";
import {getChatUsersByRole} from "../../api/citizen-api";
import {getCitizenImage} from "../../api/citizen-image";
import SockJsClient from "react-stomp";

const SOCKET_URL = 'http://localhost:8080/ws-message';

const ChatPersons = ({passSetChatId, passSetToEmail, passIsAddedMessage, passSetIsAddedMessage, passChatLatestMessages, passPersons, passToImages}) => {
    const [persons, setPersons] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [latestMessages, setLatestMessages] = useState([]);
    const [fromImage, setFromImage] = useState();
    const [toImages, setToImages] = useState([]);
    const userId = localStorage.getItem("userId");
    const [hasMessage, setHasMessage] = useState(false);
    const email = localStorage.getItem("email");
    const chatUsersRole = localStorage.getItem("role") === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN";

    const getElapsedTime = (date, latestMessage) => {
        if (latestMessage == null) {
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

    // const getChatPersons = () => {
    //     return getChatUsersByRole(chatUsersRole, (result, status, err) => {
    //             if (result !== null && status === 200) {
    //                 console.log(result);
    //                 setToImages([]);
    //                 getImages(result);
    //                 setPersons(result);
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //     );
    // }
    //
    // const getImages = (users) => {
    //     users.map((person) => {
    //         return getCitizenImage(person.citizenId, (result, status, err) => {
    //             if (result !== null && status === 200) {
    //                 setToImages(images => [...(images || []), {
    //                     id: person.citizenId,
    //                     image: URL.createObjectURL(result)
    //                 }]);
    //             } else if (status === 403) {
    //                 // setForbidden(true);
    //             } else {
    //                 setToImages(images => [...images, {
    //                     id: person.citizenId,
    //                     image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
    //                 }]);
    //             }
    //         });
    //     });
    // }

    // const getLatestMessages = () => {
    //     // users.map((person) => {
    //     //     getLatestChatMessage(userId, person.citizenId, (result, status, err) => {
    //     getLatestChatMessage(14, 16, (result, status, err) => {
    //         if (result !== null && status === 200) {
    //             // setLatestMessages(messages => [...(messages || []), {
    //             //     id: person.citizenId,
    //             //     result: result
    //             // }]);
    //             setLatestMessages(result)
    //             console.log(latestMessages)
    //         } else {
    //             console.log(err);
    //         }
    //     });
    //     // });
    // };

    const onConnected = () => {
        console.log("Connected!!!");
    };

    const onMessageReceived = (msg) => {

        passSetIsAddedMessage((prev) => !prev);
        console.log(msg.message);
    };

    // useEffect(() => {
    //     // getChatPersons();
    //     // getLatestMessages();
    //     console.log(toImages.find((element) => element.id === 16))
    // }, [passIsAddedMessage]);

    return (
        <div>
            <SockJsClient
                url={SOCKET_URL}
                topics={[
                    "/topic/message",
                    "/user/" + email + "/private",
                ]}
                onConnect={onConnected}
                onDisconnect={() => console.log("Disconnected!")}
                onMessage={(msg) => onMessageReceived(msg)}
            />
            <div style={{position: "relative", height: "400px", overflowY: "auto"}}>

                <MDBTypography listUnStyled className="mb-0">
                    <li className="p-2 border-bottom">
                        {passPersons.map((person) => (
                            <a
                                href='#'
                                onClick={() => {
                                    passSetChatId(person.citizenId);
                                    passSetToEmail(person.email)
                                }}
                                className="d-flex justify-content-between"
                            >
                                <div className="d-flex flex-row">
                                    <div>
                                        <img
                                            src={passToImages.find((element) => element.id === person.citizenId) != null ?
                                                passToImages.find((element) => element.id === person.citizenId).image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                                            style={{borderRadius: "50%"}}
                                            alt=""
                                            className="d-flex align-self-center me-3"
                                            width="60"
                                            height="60"
                                        />
                                    </div>
                                    <div className="pt-1">
                                        <p className="fw-bold mb-0">{person.firstName} {person.lastName}</p>
                                        <p className="small text-muted">
                                            {/*{latestMessages.find((element) => element.id === person.citizenId) != null*/}
                                            {/*&& latestMessages.find((element) => element.id === person.citizenId).result != null ?*/}
                                            {/*    latestMessages.find((element) => element.id === person.citizenId).result.message : "Nu aveți mesaje."}*/}
                                            {/*{latestMessages.length > 0 && (latestMessages.find((element) => element.fromCitizen === person.email) != null*/}
                                            {/*    || latestMessages.find((element) => element.fromCitizen === person.email) != null) ?*/}
                                            {/*    latestMessages.find((element) => element.fromCitizen === person.email).message : "Nu aveți mesaje."}*/}
                                            {passChatLatestMessages.length > 0 && passChatLatestMessages.find((element) => element.fromCitizen === person.email) != null && passChatLatestMessages.find((element) => element.fromCitizen === person.email).message}
                                            {passChatLatestMessages.length > 0 && passChatLatestMessages.find((element) => element.toCitizen === person.email) != null && passChatLatestMessages.find((element) => element.toCitizen === person.email).message}
                                            {/*{!hasMessage && "Nu aveți mesaje."}*/}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <p className="small text-muted mb-1">
                                        {/*{latestMessages.find((element) => element.id === person.citizenId) != null*/}
                                        {/*&& latestMessages.find((element) => element.id === person.citizenId).result != null ?*/}
                                        {/*    getElapsedTime(latestMessages.find((element) => element.id === person.citizenId).result.date,*/}
                                        {/*        latestMessages.find((element) => element.id === person.citizenId).result.message) : "" }*/}
                                    </p>
                                    <span
                                        className="badge bg-danger rounded-pill float-end">
                                2
                              </span>
                                </div>
                            </a>
                        ))}

                    </li>
                </MDBTypography>
            </div>
        </div>)
}

export default ChatPersons;