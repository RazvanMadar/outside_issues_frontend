import React, {useEffect, useState} from "react";
import {MDBIcon} from "mdb-react-ui-kit";
import {getChatMessages} from "../../api/message-api";
import {getCitizenImage} from "../../api/citizen-image";
import {sendMessageViaWebSocket} from "../../api/web-socket-api";
import ChatMessageElement from "./ChatMessageElement";

const ChatMessages = ({passChatId, passToEmail, passIsAddedMessage, passSetIsAddedMessage, passToImages, messages, setMessages}) => {
    const [message, setMessage] = useState("");
    const [fromImage, setFromImage] = useState();
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token")

    const getAllChatMessages = () => {
        return getChatMessages(token, userId, passChatId, (result, status, err) => {
                if (result !== null && status === 200) {
                    setMessages(result);
                } else {
                    console.log(err);
                }
            }
        );
    };

    const getFromImage = () => {
        return getCitizenImage(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                setFromImage(URL.createObjectURL(result));
            } else {
                setFromImage("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp")
            }
        });
    };

    const triggerWhenInputChanges = (event) => {
        setMessage(event.target.value);
    }

    const sendMessageToUser = () => {
        if (message != null && message.length > 0) {
            const data = {message: message, fromEmail: email, toEmail: passToEmail}
            return sendMessageViaWebSocket(token, data, (result, status, err) => {
                if (result != null && status == 200) {
                    passSetIsAddedMessage((prev) => !prev);
                    setMessage("");
                } else {
                    console.log(err);
                }
            });
        }
    }

    const triggerWhenEnterIsPressed = (event) => {
        if (event.key === 'Enter') {
            sendMessageToUser();
        }
    }

    useEffect(() => {
        getFromImage();
        getAllChatMessages();
    }, [passIsAddedMessage, passChatId])

    return (
        <div>
            <div key={passChatId}>
                <ChatMessageElement messages={messages} chatId={passChatId} passToImages={passToImages} />
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
                       placeholder="Scrie un mesaj..."
                       onChange={triggerWhenInputChanges}
                       maxLength={255}
                       value={message}
                       onKeyDown={triggerWhenEnterIsPressed}
                />
                <a className="ms-3" href={`#${passChatId}`}>
                    <MDBIcon fas icon="paper-plane"
                             onClick={sendMessageToUser}
                    />
                </a>
            </div>
        </div>
    )
}

export default ChatMessages;