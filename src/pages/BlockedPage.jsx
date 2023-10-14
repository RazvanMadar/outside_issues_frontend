import notFound from "./images/not_found3.jpg"
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
                    <div style={{position: "absolute", left: "50%", transform: "translate(-50%, 0)", marginTop: "3rem"}}>
                        <h1 style={{ color: "black", textAlign: "center" }}>
                            Acest cont este blocat!
                        </h1>
                    </div>
                    <img src={notFound} style={{width: "100%", height: "calc(100vh - 55px)"}}/>
                    <Button style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "10px",
                        width: "150px"
                    }}
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