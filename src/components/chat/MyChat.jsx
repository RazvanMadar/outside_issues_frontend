import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBInputGroup,
    // MDBScrollbar
} from "mdb-react-ui-kit";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import oradea from '../../pages/images/oradea8.jpg'
import me from '../../pages/images/me.jpg'
import {getChatMessages, getLatestChatMessage, sendMessage} from "../../api/message-api";
import {getChatMessageFormat} from "../../common/utils";
import SockJsClient from "react-stomp";
import {sendMessageViaWebSocket} from "../../api/web-socket-api";
import {getCitizenImage} from "../../api/citizen-image";
import noPhoto from "../../pages/images/no_photo.png";

//
// COD LUAT DUPA https://mdbootstrap.com/docs/react/extended/chat/#!
//

const SOCKET_URL = 'http://localhost:8080/ws-message';

export default function MyChat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [latestMessage, setLatestMessage] = useState();
    const [isAddedMessage, setIsAddedMessage] = useState(false);
    const [fromImage, setFromImage] = useState();
    const [toImage, setToImage] = useState();
    const userId = localStorage.getItem("userId");
    const myDivRef = useRef(null);
    const email = localStorage.getItem("email");

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

    const scrollToBottom = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = myDivRef.current.scrollHeight - myDivRef.current.clientHeight;
        }
    }

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

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    }

    const getFromImage = () => {
        return getCitizenImage(userId, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setFromImage(URL.createObjectURL(result));
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                setFromImage(noPhoto);
            }
        });
    };

    const getToImage = () => {
        return getCitizenImage(14, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setToImage(URL.createObjectURL(result));
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                setToImage(noPhoto);
            }
        });
    };

    useEffect(() => {
        getAllChatMessages();
        getLatestMessage();
        scrollToBottom();
        getFromImage();
        getToImage();
    }, [isAddedMessage, userId])

    const onConnected = () => {
        console.log("Connected!!!");
    };

    const onMessageReceived = (msg) => {
        setIsAddedMessage((prev) => !prev);
        console.log(msg.message);
    };

    const sendMessageToUser = () => {
        if (message != null && message.length > 0) {
            const data = {message: message, fromEmail: email, toEmail: 'razvanmadar@gmail.com'}
            return sendMessageViaWebSocket(data, (result, status, err) => {
                if (result != null && status == 200) {
                    setIsAddedMessage((prev) => !prev);
                    setMessage("");
                } else if (status === 403) {
                    // setForbidden(true);
                } else {
                    console.log(err);
                }
            });
        }
    }

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
            <MDBContainer fluid className="py-5" style={{backgroundColor: "#CDC4F9", height: "92vh"}}>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard id="chat3" style={{borderRadius: "15px", height: "80vh"}}>
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
                                            <div style={{position: "relative", height: "400px", overflowY: "auto"}}>

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
                                                                        alt="avatar"
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

                                            </div>

                                        </div>
                                    </MDBCol>
                                    <MDBCol md="6" lg="7" xl="8">

                                        <div ref={myDivRef}
                                             style={{position: "relative", height: "65vh", overflowY: "auto"}}>

                                            {
                                                messages.map((msg) => (
                                                    msg.fromCitizen == email ?
                                                        <div className="d-flex flex-row justify-content-end">
                                                            <div>
                                                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                                    {msg.message}
                                                                </p>
                                                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                                                    {getChatMessageFormat(msg.date)}
                                                                </p>
                                                            </div>
                                                            <img
                                                                src={fromImage}
                                                                className="me-3"
                                                                style={{borderRadius: "50%"}}
                                                                alt="avatar 1"
                                                                width="50"
                                                                height="50"
                                                            />
                                                        </div> :
                                                        <div className="d-flex flex-row justify-content-start">
                                                            <img
                                                                src={toImage}
                                                                style={{borderRadius: "50%"}}
                                                                alt="avatar 1"
                                                                width="50"
                                                                height="50"
                                                            />
                                                            <div>
                                                                <p
                                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                                    style={{backgroundColor: "#f5f6f7"}}
                                                                >
                                                                    {msg.message}
                                                                </p>
                                                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                                    12:00 PM | Aug 13
                                                                </p>
                                                            </div>
                                                        </div>
                                                ))
                                            }

                                        </div>

                                        <div
                                            className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <img
                                                src={fromImage}
                                                style={{borderRadius: "50%", marginRight: "5px"}}
                                                alt="avatar 3"
                                                width="50"
                                                height="45"
                                            />
                                            <input autoFocus={true}
                                                   type="text"
                                                   className="form-control form-control-lg"
                                                   id="exampleFormControlInput2"
                                                   placeholder="Type message"
                                                   onChange={handleInputChange}
                                                   value={message}
                                            />
                                            <a className="ms-1 text-muted" href="#!">
                                                <MDBIcon fas icon="paperclip"/>
                                            </a>
                                            <a className="ms-3" href="#!">
                                                <MDBIcon fas icon="paper-plane"
                                                    // onClick={sendAMessage}
                                                         onClick={sendMessageToUser}
                                                />
                                            </a>
                                        </div>
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