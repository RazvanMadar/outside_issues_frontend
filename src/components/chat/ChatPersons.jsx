import {MDBTypography} from "mdb-react-ui-kit";
import React, {useState} from "react";
import {getLatestChatMessage} from "../../api/message-api";
import {getChatUsersByRole} from "../../api/citizen-api";
import SockJsClient from "react-stomp";
import ChatPersonElement from "./ChatPersonElement";

const SOCKET_URL = 'http://localhost:8080/ws-message';

const ChatPersons = ({
                         passChatId,
                         passSetChatId,
                         passSetToEmail,
                         passIsAddedMessage,
                         passSetIsAddedMessage,
                         passPersons,
                         passSetPersons,
                         passSetReceivedNewUserMessage,
                         passReceivedNewUserMessage,
                         messages,
                         passIsMessageAdded
                     }) => {
    const [latestMessages, setLatestMessages] = useState([]);
    const chatUsersRole = localStorage.getItem("role");

    const token = localStorage.getItem("token")

    const getChatPersons = () => {
        return getChatUsersByRole(token, chatUsersRole, (result, status, err) => {
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

    // const onConnected = () => {
    //     console.log("Connected!!!");
    // };
    //
    // const onMessageReceived = (msg) => {
    //     console.log(email, msg)
    //     if (msg.fromEmail === email || msg.toEmail === email) {
    //         console.log(passPersons)
    //         if (!passPersons.some(item => item.email === msg.fromEmail)) {
    //             passSetReceivedNewUserMessage((prev) => !prev)
    //         }
    //         passSetIsAddedMessage((prev) => !prev);
    //         console.log(msg.message);
    //     }
    // };

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
            <div style={{position: "relative", height: "400px", overflowY: "auto"}}>

                <MDBTypography listUnStyled className="mb-0">
                    {passPersons.map((person) => {
                        return <li key={person.email} className="p-2 border-bottom">
                            <ChatPersonElement person={person}
                                               passChatId={passChatId} passSetChatId={passSetChatId}
                                               passSetToEmail={passSetToEmail}
                                               passIsAddedMessage={passIsAddedMessage}
                                               messages={messages}
                                               passReceivedNewUserMessage={passReceivedNewUserMessage}
                            />
                        </li>
                    })}
                </MDBTypography>
            </div>
        </div>)
}

export default ChatPersons;