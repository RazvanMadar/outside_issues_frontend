import {MDBTypography} from "mdb-react-ui-kit";
import React from "react";
import {getChatUsersByRole} from "../../api/citizen-api";
import ChatPersonElement from "./ChatPersonElement";


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

    return (
        <div>
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