import notFound from "./images/not_found3.jpg"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{paddingTop: "55px"}}>
            <div style={{position: "absolute", left: "50%", transform: "translate(-50%, 0)", marginTop: "3rem"}}>
                <h1 style={{ color: "black", textAlign: "center" }}>
                    Această pagină nu există!
                </h1>
            </div>
            <Button style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", padding: "10px", width: "150px"}}
                    color="primary"
                    variant="contained" onClick={() => navigate(-1)}>
                Mergi înapoi
            </Button>
            <img style={{width: "100%", height: "calc(100vh - 55px)"}} src={notFound} alt=""/>
        </div>
    )
}

export default NotFound;