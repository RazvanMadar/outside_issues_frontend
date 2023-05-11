import forbidden from "./images/forbidden_photo.jpg";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ForbiddenPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <img src={forbidden} style={{width: "100%", height: "calc(100vh - 60px)"}}/>
            <Button style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}
                    color="primary"
                    variant="contained" onClick={() => navigate(-1)}>
                Mergi înapoi
            </Button>
    </div>
    )
}

export default ForbiddenPage;