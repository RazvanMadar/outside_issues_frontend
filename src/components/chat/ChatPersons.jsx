import {MDBTypography} from "mdb-react-ui-kit";
import React from "react";
import ChatPersonElement from "./ChatPersonElement";


const ChatPersons = ({passChatId, passSetChatId, passSetToEmail, passIsAddedMessage, passPersons, messages}) => {
    return (
        <div>
            <div style={{position: "relative", height: "400px", overflowY: "auto"}}>

                <MDBTypography listUnStyled className="mb-0">
                    {passPersons.map((person) => {
                        return <li key={person.email} className="p-2 border-bottom">
                            <ChatPersonElement person={person} passChatId={passChatId} passSetChatId={passSetChatId}
                                               passSetToEmail={passSetToEmail} passIsAddedMessage={passIsAddedMessage}
                                               messages={messages}
                            />
                        </li>
                    })}
                </MDBTypography>
            </div>
        </div>)
}

export default ChatPersons;