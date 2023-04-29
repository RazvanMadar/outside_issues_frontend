import React, {useEffect, useRef, useState} from "react";
import {getChatMessageFormat} from "../../common/utils";
import {MDBIcon} from "mdb-react-ui-kit";
import {getChatMessages} from "../../api/message-api";
import {getCitizenImage} from "../../api/citizen-image";
import noPhoto from "../../pages/images/no_photo.png";
import {sendMessageViaWebSocket} from "../../api/web-socket-api";
import SockJsClient from "react-stomp";

const SOCKET_URL = 'http://localhost:8080/ws-message';

const ChatMessages = ({passChatId, passToEmail, passIsAddedMessage, passSetIsAddedMessage}) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [fromImage, setFromImage] = useState();
    const [toImage, setToImage] = useState();
    const userId = localStorage.getItem("userId");
    const myDivRef = useRef(null);
    const email = localStorage.getItem("email");
    // const [isAddedMessage, setIsAddedMessage] = useState(false);

    const getAllChatMessages = () => {
        return getChatMessages(userId, passChatId, (result, status, err) => {
                if (result !== null && status === 200) {
                    setMessages(result);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const getFromImage = () => {
        return getCitizenImage(userId, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setFromImage(URL.createObjectURL(result));
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                setFromImage(noPhoto)
            }
        });
    };

    const getToImage = () => {
        return getCitizenImage(passChatId, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                setToImage(URL.createObjectURL(result));
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                setToImage(noPhoto)
            }
        });
    };

    const scrollToBottom = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = myDivRef.current.scrollHeight - myDivRef.current.clientHeight;
        }
    }

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    }

    const sendMessageToUser = () => {
        if (message != null && message.length > 0) {
            const data = {message: message, fromEmail: email, toEmail: passToEmail}
            return sendMessageViaWebSocket(data, (result, status, err) => {
                if (result != null && status == 200) {
                    passSetIsAddedMessage((prev) => !prev);
                    // setIsAddedMessage((prev) => !prev)
                    setMessage("");
                } else if (status === 403) {
                    // setForbidden(true);
                } else {
                    console.log(err);
                }
            });
        }
    }

    // const onConnected = () => {
    //     console.log("Connected!!!");
    // };
    //
    // const onMessageReceived = (msg) => {
    //     passSetIsAddedMessage((prev) => !prev);
    //     console.log(msg.message);
    // };

    useEffect(() => {
        getFromImage();
        getToImage();
        getAllChatMessages();
        scrollToBottom();
    }, [passIsAddedMessage, passChatId])

    return (
        <div>
            {/*<SockJsClient*/}
            {/*    url={SOCKET_URL}*/}
            {/*    topics={[*/}
            {/*        "/topic/message",*/}
            {/*        "/user/" + email + "/private",*/}
            {/*    ]}*/}
            {/*    onConnect={onConnected}*/}
            {/*    onDisconnect={() => console.log("Disconnected!")}*/}
            {/*    onMessage={(msg) => onMessageReceived(msg)}*/}
            {/*/>*/}
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
                                    alt=""
                                    width="50"
                                    height="50"
                                />
                            </div> :
                            <div className="d-flex flex-row justify-content-start">
                                <img
                                    src={toImage}
                                    style={{borderRadius: "50%"}}
                                    alt=""
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
                    alt=""
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
                             onClick={sendMessageToUser}
                    />
                </a>
            </div>
        </div>
    )
}

export default ChatMessages;