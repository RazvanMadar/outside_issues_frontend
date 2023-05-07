import React, {useEffect, useRef, useState} from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInputGroup,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import {getChatMessages, getLatestChatMessage} from "../../api/message-api";
import {getChatMessageFormat} from "../../common/utils";
import SockJsClient from "react-stomp";
import {sendMessageViaWebSocket} from "../../api/web-socket-api";
import {getCitizenImage} from "../../api/citizen-image";
import noPhoto from "../../pages/images/no_photo.png";
import ChatPersons from "./ChatPersons";
import ChatMessages from "./ChatMessages";
import {getChatUsersByRole} from "../../api/citizen-api";

//
// COD LUAT DUPA https://mdbootstrap.com/docs/react/extended/chat/#!
//

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function MyChat() {
    const [persons, setPersons] = useState([]);
    const [toImages, setToImages] = useState([]);
    const [isAddedMessage, setIsAddedMessage] = useState(false);
    const [fromImage, setFromImage] = useState();
    const [toImage, setToImage] = useState();
    const [chatId, setChatId] = useState();
    const userId = localStorage.getItem("userId");
    const myDivRef = useRef(null);
    const email = localStorage.getItem("email");
    const [toEmail, setToEmail] = useState();
    const [latestMessages, setLatestMessages] = useState([]);
    const chatUsersRole = localStorage.getItem("role");
    //
    // const getElapsedTime = (date) => {
    //     if (latestMessage.message == null) {
    //         return "";
    //     }
    //     const past = new Date(date);
    //     const now = new Date();
    //     let elapsedTime = Math.floor((now - past) / 60000);
    //     let type = 0;
    //     let time = "minute";
    //     if (elapsedTime > 59) {
    //         elapsedTime /= 60;
    //         time = "ore";
    //         type = 1;
    //     }
    //     if (elapsedTime > 23 && type == 1) {
    //         elapsedTime /= 24;
    //         time = "zile";
    //         type = 2;
    //     }
    //     if (elapsedTime > 29 && type == 2) {
    //         elapsedTime /= 30;
    //         time = "luni";
    //         type = 3;
    //     }
    //     if (elapsedTime > 11 && type == 3) {
    //         elapsedTime /= 12;
    //         time = "ani";
    //     }
    //     return Math.floor(elapsedTime) + " " + time;
    // }
    //
    // const scrollToBottom = () => {
    //     if (myDivRef.current) {
    //         myDivRef.current.scrollTop = myDivRef.current.scrollHeight - myDivRef.current.clientHeight;
    //     }
    // }
    //
    // const getAllChatMessages = () => {
    //     return getChatMessages(userId, 14, (result, status, err) => {
    //             if (result !== null && status === 200) {
    //                 setMessages(result);
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //     );
    // };
    //
    // const getLatestMessage = () => {
    //     return getLatestChatMessage(userId, 14, (result, status, err) => {
    //             if (result !== null && status === 200) {
    //                 setLatestMessage(result);
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //     );
    // };
    //
    // const handleInputChange = (event) => {
    //     setMessage(event.target.value);
    // }
    //
    // const getFromImage = () => {
    //     return getCitizenImage(userId, (result, status, err) => {
    //         if (result !== null && status === 200) {
    //             console.log(result);
    //             setFromImage(URL.createObjectURL(result));
    //         } else if (status === 403) {
    //             // setForbidden(true);
    //         } else {
    //             setFromImage(noPhoto);
    //         }
    //     });
    // };
    //
    // const getToImage = () => {
    //     return getCitizenImage(14, (result, status, err) => {
    //         if (result !== null && status === 200) {
    //             console.log(result);
    //             setToImage(URL.createObjectURL(result));
    //         } else if (status === 403) {
    //             // setForbidden(true);
    //         } else {
    //             setToImage(noPhoto);
    //         }
    //     });
    // };

    // useEffect(() => {
    //     getAllChatMessages();
    //     getLatestMessage();
    //     scrollToBottom();
    //     getFromImage();
    //     getToImage();
    // }, [isAddedMessage, userId])

    // const sendMessageToUser = () => {
    //     if (message != null && message.length > 0) {
    //         const data = {message: message, fromEmail: email, toEmail: 'razvanmadar@gmail.com'}
    //         return sendMessageViaWebSocket(data, (result, status, err) => {
    //             if (result != null && status == 200) {
    //                 setIsAddedMessage((prev) => !prev);
    //                 setMessage("");
    //             } else if (status === 403) {
    //                 // setForbidden(true);
    //             } else {
    //                 console.log(err);
    //             }
    //         });
    //     }
    // }

    // const onConnected = () => {
    //     console.log("Connected!!!");
    // };
    //
    // const onMessageReceived = (msg) => {
    //     setIsAddedMessage((prev) => !prev);
    //     console.log(msg.message);
    // };

    const getChatPersons = () => {
        return getChatUsersByRole(chatUsersRole, (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log(result);
                    setToImages([]);
                    getImages(result);
                    setPersons(result);
                } else {
                    console.log(err);
                }
            }
        );
    }

    const getImages = (users) => {
        users.map((person) => {
            return getCitizenImage(person.citizenId, (result, status, err) => {
                if (result !== null && status === 200) {
                    setToImages(images => [...(images || []), {
                        id: person.citizenId,
                        image: URL.createObjectURL(result)
                    }]);
                } else if (status === 403) {
                    // setForbidden(true);
                } else {
                    setToImages(images => [...images, {
                        id: person.citizenId,
                        image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    }]);
                }
            });
        });
    }

    const getLatestMessages = () => {
        getLatestChatMessage(14, 16, (result, status, err) => {
            if (result !== null && status === 200) {
                setLatestMessages(result)
                console.log(latestMessages)
            } else {
                console.log(err);
            }
        });
    };

    useEffect(() => {
        getChatPersons();
        // getLatestMessages();
    }, [])

    return (
        <div style={{height: "100vh"}}>
            <MDBContainer fluid className="py-5" style={{backgroundColor: "#FFF", height: "100%"}}>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard id="chat3" style={{borderRadius: "15px", height: "100%", backgroundColor: "#F4F4F4"}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                                        <div className="p-3">
                                            <MDBInputGroup className="rounded mb-3">
                                                <input
                                                    className="form-control rounded"
                                                    placeholder="Search"
                                                    type="search"
                                                />
                                                <span
                                                    className="input-group-text border-0"
                                                    id="search-addon"
                                                >
                        <MDBIcon fas icon="search"/>
                      </span>
                                            </MDBInputGroup>

                                            <ChatPersons passChatId={chatId} passSetChatId={setChatId} passSetToEmail={setToEmail}
                                                         passIsAddedMessage={isAddedMessage}
                                                         passSetIsAddedMessage={setIsAddedMessage}
                                                         passChatLatestMessages={latestMessages} passPersons={persons}
                                                         passSetPersons={setPersons}
                                                // passToImages={toImages}
                                                // passSetToImages={setToImages}
                                            />

                                        </div>
                                    </MDBCol>
                                    <MDBCol md="6" lg="7" xl="8">
                                        {chatId != null && <ChatMessages passChatId={chatId} passToEmail={toEmail}
                                                                         passIsAddedMessage={isAddedMessage}
                                                                         passSetIsAddedMessage={setIsAddedMessage}
                                                                         passPersons={persons}
                                                                         passToImages={toImages}/>}

                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}