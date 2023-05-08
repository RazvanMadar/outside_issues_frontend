import blockedLogo from "./images/blockedLogo.jpg";
import {useNavigate} from "react-router-dom";

const BlockedPage = () => {
    const isBlocked = localStorage.getItem("isBlocked");
    const navigate = useNavigate();

    return (
        <div>
            {isBlocked ? <img src={blockedLogo}/> : navigate('/issues')}
        </div>
    )
}

export default BlockedPage;