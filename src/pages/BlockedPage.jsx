import blockedLogo from "./images/blockedLogo.jpg";
import {Navigate, useLocation} from "react-router-dom";

const BlockedPage = () => {
    const isBlocked = localStorage.getItem("isBlocked");
    const location = useLocation();

    return (
        <div> {isBlocked ?
            <img src={blockedLogo} style={{width: "100%", height: "calc(100vh - 60px)"}}/>
            : <Navigate to={"/issues"} state={{ from: location }} replace />}
        </div>
    )
}

export default BlockedPage;