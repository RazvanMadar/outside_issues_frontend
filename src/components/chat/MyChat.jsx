import React, {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow,} from "mdb-react-ui-kit";
import {getCitizenImage} from "../../api/citizen-image";
import ChatPersons from "./ChatPersons";
import ChatMessages from "./ChatMessages";
import {getChatUsersByRole} from "../../api/citizen-api";
import {Navigate} from "react-router-dom";

//
// COD LUAT DUPA https://mdbootstrap.com/docs/react/extended/chat/#!
//

const MyChat = ({passBackgroundColor, passPersons, passSetPersons, passReceivedNewUserMessage,
                                   passIsMessageAdded, passSetIsMessageAdded
                               }) => {
    const [toImages, setToImages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState();
    const [toEmail, setToEmail] = useState();
    const chatUsersRole = localStorage.getItem("role");
    const token = localStorage.getItem("token")
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    const getChatPersons = () => {
        return getChatUsersByRole(token, chatUsersRole, '', (result, status, err) => {
                if (result !== null && status === 200) {
                    console.log(result);
                    setToImages([]);
                    getImages(result);
                    passSetPersons(result);
                } else {
                    console.log(err);
                }
            }
        );
    }

    const getImages = (users) => {
        users.map((person) => {
            return getCitizenImage(token, person.citizenId, (result, status, err) => {
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

    useEffect(() => {
        getChatPersons();
    }, [passReceivedNewUserMessage])

    return (
        <div style={{paddingTop: "28px"}}>
            {!isBlocked ?
                <div style={{height: "calc(100vh - 28px)"}}>
                    <MDBContainer fluid className="py-5" style={{
                        backgroundColor: passBackgroundColor === 'white' ? 'white' : "#BCBEC8",
                        height: "100%"
                    }}>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBCard id="chat3"
                                         style={{borderRadius: "15px", height: "100%", backgroundColor: "#F4F4F4"}}>
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                                                <div className="p-3">
                                                    <ChatPersons passChatId={chatId} passSetChatId={setChatId}
                                                                 passSetToEmail={setToEmail}
                                                                 passIsAddedMessage={passIsMessageAdded}
                                                                 passPersons={passPersons} messages={messages}
                                                    />
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="6" lg="7" xl="8">
                                                {chatId != null &&
                                                    <ChatMessages passChatId={chatId} passToEmail={toEmail}
                                                                  passIsAddedMessage={passIsMessageAdded}
                                                                  passSetIsAddedMessage={passSetIsMessageAdded}
                                                                  passToImages={toImages}
                                                                  messages={messages} setMessages={setMessages}
                                                    />}
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div> : <Navigate to={"/blocked"} replace/>
            }
        </div>
    );
}

export default MyChat;