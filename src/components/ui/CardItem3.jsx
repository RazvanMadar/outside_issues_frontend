import React, {useEffect, useRef, useState} from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle,} from "reactstrap";
import {getFirstImage} from "../../api/issue-image-api";
import DateFormat from "../layout/DateFormat";
import classes from "./CardItem.module.css";
import {
    convertAPIStatesToUI,
    convertAPITypesToUI,
    cutFromDescription,
    getBackgroundColorForState, getImageRegardingIssueType
} from "../../common/utils";
import Checkbox from '@mui/material/Checkbox';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {useNavigate} from "react-router-dom";
import Slide from '@mui/material/Slide';

const CardItem3 = ({issue, key, passBackgroundColor, passIsUpdated}) => {
    const [mainImage, setMainImage] = useState(null);
    const [forbidden, setForbidden] = useState(null);
    const [likeButton, setLikeButton] = useState(false);
    const [dislikeButton, setDislikeButton] = useState(false);
    const [nrOfLikes, setNrOfLikes] = useState(issue.likesNumber);
    const [nrOfDislikes, setNrOfDislikes] = useState(issue.dislikesNumber);
    const [openDialog, setOpenDialog] = useState(false);
    const deleteReasonInputRef = useRef('');
    const navigate = useNavigate();

    const isLogged = localStorage.getItem("isLogged");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const backgroundColor = getBackgroundColorForState(issue.state);

    const token = localStorage.getItem("token")

    const geMainImage = () => {
        return getFirstImage(token, issue.id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                // resizeImage(result).then(r => setMainImage(r));
                setMainImage(URL.createObjectURL(result));
            } else if (status === 403) {
                setForbidden(true);
            } else {
                setMainImage(getImageRegardingIssueType((issue.type)));
            }
        });
    };

    useEffect(() => {
        geMainImage();
    }, [issue.id, passIsUpdated]);

    return (
        <div
            style={{
                display: "inline",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "1rem",
                fontSize: "small",
            }}
        >
            <Card
                accessKey={issue.id}
                style={{
                    width: "18rem",
                    height: "22rem",
                    backgroundColor: passBackgroundColor === 'white' ? 'white' : "#BCBEC8",
                    boxShadow: "7px 5px 5px grey"
                }}
            >
                {/*<div style={{backgroundImage: "{{mainImage}}", backgroundSize: "cover", height: "70%", width: "70%", backgroundRepeat: "no-repeat"}}>*/}
                <img alt="" style={{height: "10rem", padding: "5px", borderRadius: "5%"}}
                     src={mainImage}/>
                <CardBody>
                    <CardTitle tag="h5" style={{textAlign: "center"}}>
                        {convertAPITypesToUI(issue.type)}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6" style={{textAlign: "center"}}>
                        {issue.actualLocation}
                    </CardSubtitle>
                    <CardText style={{textAlign: "center"}}>
                        {cutFromDescription(issue.description)}
                    </CardText>
                    <div className={classes.date}>
                        <DateFormat
                            date={new Date(issue.reportedDate.replace(" ", "T"))}
                        />
                    </div>
                    {nrOfLikes > 0 && issue.state !== 'SOLVED' ? <div className={classes.urgent}
                                                                      style={{
                                                                          position: "absolute",
                                                                          top: "10px",
                                                                          left: "10px",
                                                                          fontWeight: "bold"
                                                                      }}>
                        prioritar
                    </div> : ""
                    }
                    {/*{!isLogged || isLogged && role === "ROLE_ADMIN" ?*/}
                    {/*    <div>*/}
                    {/*        <div style={{position: "absolute", bottom: "5px", right: "4rem"}}>*/}
                    {/*            {nrOfLikes}*/}
                    {/*            <Checkbox icon={<ThumbUpOffAltIcon/>} disabled/>*/}
                    {/*        </div>*/}
                    {/*        <div style={{position: "absolute", bottom: "5px", right: "3px"}}>*/}
                    {/*            {nrOfDislikes}*/}
                    {/*            <Checkbox icon={<ThumbDownOffAltIcon/>} disabled/>*/}
                    {/*        </div>*/}
                    {/*    </div> : ""*/}
                    {/*}*/}
                    <div className={classes.state}
                         style={{
                             position: "absolute",
                             textAlign: "center",
                             bottom: "10px",
                             fontWeight: "bold",
                             backgroundColor: backgroundColor
                         }}>
                        {convertAPIStatesToUI(issue.state).toLowerCase()}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardItem3;
