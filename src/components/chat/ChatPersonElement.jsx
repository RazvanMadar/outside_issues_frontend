import React, {useEffect, useState} from "react";
import {getLatestChatMessage} from "../../api/message-api";
import {getCitizenImage} from "../../api/citizen-image";
import {getElapsedTime} from "../../common/utils";

const ChatPersonElement = ({person, passSetChatId, passChatId, passSetToEmail, passIsAddedMessage, messages}) => {
    const [latestMessage, setLatestMessage] = useState(null);
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem("userId")
    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")

    const findLatestMessageByCitizenId = () => {
        return getLatestChatMessage(token, person.citizenId, userId, (result, status, err) => {
                if (result !== null && status === 200) {
                    setLatestMessage(result);
                } else {

                }
            }
        );
    }

    const getImage = () => {
        return getCitizenImage(token, person.citizenId, (result, status, err) => {
            if (result !== null && status === 200) {
                setImage(URL.createObjectURL(result));
            } else {

            }
        });
    }

    const restrictLatestMessageSize = (message) => {
        return message !== null && message.length > 15 ? message.substring(0, 15) + "..." : message;
    }

    useEffect(() => {
        getImage();
        findLatestMessageByCitizenId();
    }, [passIsAddedMessage, messages]);

    return (<div>
        <a
            href={`#${passChatId}`}
            onClick={() => {
                passChatId == null ? passSetChatId(person.citizenId) : passSetChatId(null);
                passSetToEmail(person.email)
            }}
            className="d-flex justify-content-between"
        >
            <div className="d-flex flex-row">
                <div>
                    <img
                        src={image != null ? image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                        style={{borderRadius: "50%"}}
                        alt=""
                        className="d-flex align-self-center me-3"
                        width="60"
                        height="60"
                    />
                </div>
                <div className="pt-1">
                    <p className="fw-bold mb-0">{person.firstName} {person.lastName}</p>
                    {latestMessage != null ? (
                        <>
                            {latestMessage.fromCitizen === email ? (
                                <p className="small text-muted">Tu: {restrictLatestMessageSize(latestMessage.message)}</p>
                            ) : (
                                <p className="small text-muted">{restrictLatestMessageSize(latestMessage.message)}</p>
                            )}
                        </>
                    ) : "Nu aveți mesaje."}
                </div>
            </div>
            <div className="pt-1">
                <p className="small text-muted mb-1">
                    {latestMessage != null && getElapsedTime(latestMessage.date, latestMessage.message)}
                </p>
            </div>
        </a>
    </div>)
}

export default ChatPersonElement;