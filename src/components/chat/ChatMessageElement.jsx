import {getChatMessageFormat} from "../../common/utils";
import {useEffect, useState} from "react";
import {getCitizenImage} from "../../api/citizen-image";

const ChatMessageElement = ({messages, chatId, passToImages}) => {
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId")
    const [fromImage, setFromImage] = useState(null);

    const getFromImage = () => {
        return getCitizenImage(userId, (result, status, err) => {
            if (result !== null && status === 200) {
                setFromImage(URL.createObjectURL(result));
            } else if (status === 403) {
                // setForbidden(true);
            } else {
                console.log(err)
            }
        });
    };

    useEffect(() => {
        getFromImage();
    }, []);


    return (<div>
        {messages.map((msg) => (
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
                        src={fromImage != null ? fromImage : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"}
                        className="me-3"
                        style={{borderRadius: "50%"}}
                        alt=""
                        width="50"
                        height="50"
                    />
                </div> :
                <div className="d-flex flex-row justify-content-start">
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
                            12:00 PM | Aug 13
                        </p>
                    </div>
                </div>))}
    </div>)
}

export default ChatMessageElement;