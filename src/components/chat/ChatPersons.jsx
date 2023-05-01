import {MDBTypography} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import {getLatestChatMessage} from "../../api/message-api";
import {getChatUsersByRole} from "../../api/citizen-api";
import {getCitizenImage} from "../../api/citizen-image";
import SockJsClient from "react-stomp";
import ChatPersonElement from "./ChatPersonElement";

const SOCKET_URL = 'http://localhost:8080/ws-message';

const ChatPersons = ({
                         passSetChatId,
                         passSetToEmail,
                         passIsAddedMessage,
                         passSetIsAddedMessage,
                         passChatLatestMessages,
                         passPersons,
                         // passToImages,
                         passSetPersons,
                         // passSetToImages
                     }) => {
    const [persons, setPersons] = useState([]);
    const [latestMessages, setLatestMessages] = useState([]);
    const [toImages, setToImages] = useState([]);
    const email = localStorage.getItem("email");
    const chatUsersRole = localStorage.getItem("role") === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN";

    const getChatPersons = () => {
        return getChatUsersByRole(chatUsersRole, (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log(result);
                    // getImages(result);
                    passSetPersons(result);
                } else {
                    console.log(err);
                }
            }
        );
    }

    // const getImages = (users) => {
    //     users.map((person) => {
    //         return getCitizenImage(person.citizenId, (result, status, err) => {
    //             if (result !== null && status === 200) {
    //                 passSetToImages(images => [...(images || []), {
    //                     id: person.citizenId,
    //                     image: URL.createObjectURL(result)
    //                 }]);
    //             } else if (status === 403) {
    //                 // setForbidden(true);
    //             } else {
    //                 passSetToImages(images => [...images, {
    //                     id: person.citizenId,
    //                     image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
    //                 }]);
    //             }
    //         });
    //     });
    // }

    const getLatestMessages = () => {
        // users.map((person) => {
        //     getLatestChatMessage(userId, person.citizenId, (result, status, err) => {
        getLatestChatMessage(14, 16, (result, status, err) => {
            if (result !== null && status === 200) {
                // setLatestMessages(messages => [...(messages || []), {
                //     id: person.citizenId,
                //     result: result
                // }]);
                setLatestMessages(result)
                console.log(latestMessages)
            } else {
                console.log(err);
            }
        });
        // });
    };

    const onConnected = () => {
        console.log("Connected!!!");
    };

    const onMessageReceived = (msg) => {
        if (msg.fromEmail === email || msg.toEmail === email) {
            if (!passPersons.some(item => item.email === msg.fromEmail) && !passPersons.some(item => item.email === msg.toEmail)) {
                getChatPersons();
                // getLatestMessages();
            }
            passSetIsAddedMessage((prev) => !prev);
            console.log(msg.message);
        }
    };

    // useEffect(() => {
    //     getLatestMessages();
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
                            <ChatPersonElement person={person}
                                               // passToImages={passToImages}
                                               passSetChatId={passSetChatId} passSetToEmail={passSetToEmail}
                                               passIsAddedMessage={passIsAddedMessage}
                            />
                        ))}
                    </li>
                </MDBTypography>
            </div>
        </div>)
}

export default ChatPersons;