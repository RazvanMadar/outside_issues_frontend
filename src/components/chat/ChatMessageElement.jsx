import {getChatMessageFormat} from "../../common/utils";
import {useEffect, useRef, useState} from "react";
import {getCitizenImage} from "../../api/citizen-image";

const ChatMessageElement = ({messages, chatId, passToImages}) => {
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId")
    const [fromImage, setFromImage] = useState(null);
    const myDivRef = useRef(null);
    const token = localStorage.getItem("token")

    const getFromImage = () => {
        return getCitizenImage(token, userId, (result, status, err) => {
            if (result !== null && status === 200) {
                setFromImage(URL.createObjectURL(result));
            } else {
                console.log(err)
            }
        });
    };

    const scrollToBottom = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = myDivRef.current.scrollHeight - myDivRef.current.clientHeight;
        }
    }

    useEffect(() => {
        getFromImage();
        scrollToBottom();
    }, [messages]);


    return (<div ref={myDivRef} style={{position: "relative", height: "65vh", overflowY: "auto"}}>
        {messages.map((msg) => (
            msg.fromCitizen == email ?
                <div className="d-flex flex-row justify-content-end" key={msg.date}>
                    <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                            {msg.message}
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                            {getChatMessageFormat(msg.date)}
                        </p>
                    </div>
                    <img
                        src={fromImage != null ? fromImage : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                        className="me-3"
                        style={{borderRadius: "50%"}}
                        alt=""
                        width="50"
                        height="50"
                    />
                </div> :
                <div className="d-flex flex-row justify-content-start" key={msg.date}>
                    <img
                        src={passToImages.find((element) => element.id === chatId) != null ?
                            passToImages.find((element) => element.id === chatId).image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
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
                            {getChatMessageFormat(msg.date)}
                        </p>
                    </div>
                </div>))}
    </div>)
}

export default ChatMessageElement;