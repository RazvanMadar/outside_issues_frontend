import React, {useEffect, useRef, useState} from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow,} from "mdb-react-ui-kit";
import {getCitizenImage} from "../../api/citizen-image";
import ChatPersons from "./ChatPersons";
import ChatMessages from "./ChatMessages";
import {getChatUsersByRole} from "../../api/citizen-api";
import {Navigate} from "react-router-dom";

//
// COD LUAT DUPA https://mdbootstrap.com/docs/react/extended/chat/#!
//

export default function MyChat({
                                   passBackgroundColor,
                                   passPersons,
                                   passSetPersons,
                                   passReceivedNewUserMessage,
                                   passSetReceivedNewUserMessage,
                                   passIsMessageAdded,
                                   passSetIsMessageAdded
                               }) {
    const [toImages, setToImages] = useState([]);
    // const [isAddedMessage, setIsAddedMessage] = useState(false);
    const [messages, setMessages] = useState([]);
    const [fromImage, setFromImage] = useState();
    const [toImage, setToImage] = useState();
    const [chatId, setChatId] = useState();
    const userId = localStorage.getItem("userId");
    const myDivRef = useRef(null);
    const email = localStorage.getItem("email");
    const [toEmail, setToEmail] = useState();
    const [latestMessages, setLatestMessages] = useState([]);
    const chatUsersRole = localStorage.getItem("role");
    const [citizenName, setCitizenName] = useState('');
    const [searchOn, setSearchOn] = useState(false);

    const token = localStorage.getItem("token")
    const isBlocked = localStorage.getItem("isBlocked") !== null ? true : false;

    const getChatPersons = () => {
        return getChatUsersByRole(token, chatUsersRole, citizenName, (result, status, err) => {
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
    }, [passReceivedNewUserMessage, searchOn])

    return (
        <div>
            {!isBlocked ?
                <div style={{height: "calc(100vh - 60px)"}}>
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
                                                    {/*                      <MDBInputGroup className="rounded mb-3">*/}
                                                    {/*                          <input*/}
                                                    {/*                              className="form-control rounded"*/}
                                                    {/*                              placeholder="Search"*/}
                                                    {/*                              type="search"*/}
                                                    {/*                              onKeyDown={handleKeyDown}*/}
                                                    {/*                              onChange={handleInputChange}*/}
                                                    {/*                          />*/}
                                                    {/*                          <span*/}
                                                    {/*                              className="input-group-text border-0"*/}
                                                    {/*                              id="search-addon"*/}
                                                    {/*                          >*/}
                                                    {/*  {isAdmin && <MDBIcon fas icon="search" onClick={() => setSearchOn((prev) => !prev)}/>}*/}
                                                    {/*</span>*/}
                                                    {/*                      </MDBInputGroup>*/}

                                                    <ChatPersons passChatId={chatId} passSetChatId={setChatId}
                                                                 passSetToEmail={setToEmail}
                                                                 passIsAddedMessage={passIsMessageAdded}
                                                                 passSetIsAddedMessage={passSetIsMessageAdded}
                                                                 passChatLatestMessages={latestMessages}
                                                                 passPersons={passPersons}
                                                                 passSetPersons={passSetPersons}
                                                                 passReceivedNewUserMessage={passReceivedNewUserMessage}
                                                                 passSetReceivedNewUserMessage={passSetReceivedNewUserMessage}
                                                                 messages={messages}
                                                                 passIsMessageAdded={passIsMessageAdded}
                                                        // passToImages={toImages}
                                                        // passSetToImages={setToImages}
                                                    />

                                                </div>
                                            </MDBCol>
                                            <MDBCol md="6" lg="7" xl="8">
                                                {chatId != null &&
                                                    <ChatMessages passChatId={chatId} passToEmail={toEmail}
                                                                  passIsAddedMessage={passIsMessageAdded}
                                                                  passSetIsAddedMessage={passSetIsMessageAdded}
                                                                  passPersons={passPersons}
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