import blockedLogo from "./images/blockedLogo.jpg";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const BlockedPage = () => {
    const isBlocked = localStorage.getItem("isBlocked");
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div style={{paddingTop: "55px"}}>
            {isBlocked ?
                <div>
                    <img src={blockedLogo} style={{width: "100%", height: "calc(100vh - 55px)"}}/>
                    <Button style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}
                            color="primary"
                            variant="contained" onClick={() => navigate(-1)}>
                        Mergi înapoi
                    </Button>
                </div>
                : <Navigate to={"/"} state={{from: location}} replace/>
            }
        </div>
    )
}

export default BlockedPage;