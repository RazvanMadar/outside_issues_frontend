import React, {useEffect, useState} from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle,} from "reactstrap";
import {getFirstImage} from "../../api/issue-image-api";
import Resizer from "react-image-file-resizer";
import DateFormat from "../layout/DateFormat";
import classes from "./CardItem.module.css";
import {
    convertAPIStatesToUI,
    convertAPITypesToUI,
    cutFromDescription,
    getBackgroundColorForState
} from "../../common/utils";
import Checkbox from '@mui/material/Checkbox';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import noPhoto from "../../pages/images/no_photo.png";
import {getReactionsForSomeCitizenAndIssue} from "../../api/citizen-reactions-api";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IssueDetails from "../../pages/IssueDetails";
import {useNavigate} from "react-router-dom";
import {deleteIssueById} from "../../api/issue-api";

const CardItem2 = ({issue, passReactions, passSetReactions, passIsDeleted}) => {
    const [mainImage, setMainImage] = useState(null);
    const [forbidden, setForbidden] = useState(null);
    const [likeButton, setLikeButton] = useState(false);
    const [dislikeButton, setDislikeButton] = useState(false);
    const [nrOfLikes, setNrOfLikes] = useState(issue.likesNumber);
    const [nrOfDislikes, setNrOfDislikes] = useState(issue.dislikesNumber);
    const navigate = useNavigate();

    const isLogged = localStorage.getItem("isLogged");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const backgroundColor = getBackgroundColorForState(issue.state);

    const getReactionsForCurrentUserAndIssue = () => {
        return getReactionsForSomeCitizenAndIssue(userId, issue.id, (result, status, err) => {
            if (status === 200 && result !== null) {
                if (result === true) {
                    setLikeButton(true);
                } else {
                    setDislikeButton(true);
                }
            } else {
                console.log(err);
            }
        });
    };

    const geMainImage = () => {
        return getFirstImage(issue.id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                // resizeImage(result).then(r => setMainImage(r));
                setMainImage(URL.createObjectURL(result));
            } else if (status === 403) {
                setForbidden(true);
            } else {
                setMainImage(noPhoto);
            }
        });
    };

    const deleteAnIssue = () => {
        return deleteIssueById(issue.id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                passIsDeleted((prev) => !prev)
            } else {
                console.log(err);
            }
        });
    };

    const handleLike = () => {
        if (likeButton) {
            setLikeButton(false);
            setNrOfLikes((prev) => prev - 1);
            updateLocalStorageWithReactions(0);
            console.log(passReactions)
        } else {
            setLikeButton(true);
            setNrOfLikes((prev) => prev + 1);
            let type = 3;
            if (dislikeButton) {
                setNrOfDislikes((prev) => prev - 1);
                type = 1;
            }
            updateLocalStorageWithReactions(type);
            setDislikeButton(false);
        }
    }

    const handleDislike = () => {
        if (dislikeButton) {
            setDislikeButton(false);
            setNrOfDislikes((prev) => prev - 1);
            updateLocalStorageWithReactions(-2);
        } else {
            setDislikeButton(true);
            setNrOfDislikes((prev) => prev + 1);
            let type = 4;
            if (likeButton) {
                setNrOfLikes((prev) => prev - 1);
                type = -1;
            }
            updateLocalStorageWithReactions(type);
            setLikeButton(false);
        }
    }

    const updateLocalStorageWithReactions = (type) => {
        const existingObjects = JSON.parse(localStorage.getItem("reactions")) || [];
        const objectToReplace = {citizenId: parseInt(userId), issueId: issue.id, type: parseInt(type)};
        const objectIndex = existingObjects.findIndex(object => {
            const parsedObject = JSON.parse(object);
            return parsedObject.citizenId === objectToReplace.citizenId &&
                parsedObject.issueId === objectToReplace.issueId
        });
        if (objectIndex > -1) {
            existingObjects[objectIndex] = JSON.stringify(objectToReplace);
        } else {
            existingObjects.push(JSON.stringify({citizenId: parseInt(userId), issueId: issue.id, type: type}));
        }
        localStorage.setItem("reactions", JSON.stringify(existingObjects));
    }

    const handleEdit = () => {
        navigate(`/issues/${issue.id}`);
    }

    const resizeImageHandler = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1000,
                1000,
                "PNG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64",
                150,
                500
            );
        });

    const resizeImage = async (file) => {
        return await resizeImageHandler(file);
    }


    // createImageBitmap(
    //     mainImage,
    //     { resizeWidth: 300, resizeHeight: 234, resizeQuality: 'high' }
    // )
    //     .then(imageBitmap =>
    //         document.getElementById('canvas').getContext('2d').drawImage(imageBitmap, 0, 0)
    //     );

    useEffect(() => {
        geMainImage();
        getReactionsForCurrentUserAndIssue();
    }, [issue.id]);

    return (
        <div
            style={{
                display: "inline",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "1rem",
                // padding: "0 15% 10% 0",
                fontSize: "small",
            }}
        >
            <Card
                accessKey={issue.id}
                style={{
                    width: "18rem",
                    height: "22rem"
                }}
            >
                {/*<div style={{backgroundImage: "{{mainImage}}", backgroundSize: "cover", height: "70%", width: "70%", backgroundRepeat: "no-repeat"}}>*/}
                <img alt="" style={{height: "10rem", padding: "5px", borderRadius: "5%"}}
                     src={mainImage}/>
                {/*</div>*/}
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
                    {isLogged && role === "ROLE_ADMIN" ?
                        <div>
                            <div className={classes.state}
                                 style={{
                                     position: "absolute",
                                     textAlign: "center",
                                     bottom: "10px",
                                     left: "5px",
                                     fontWeight: "bold",
                                     backgroundColor: backgroundColor
                                 }}>
                                {convertAPIStatesToUI(issue.state).toLowerCase()}
                            </div>
                            <IconButton aria-label="edit" style={{position: "absolute", left: "85px", bottom: "7px"}}
                                        onClick={handleEdit}>
                                <BorderColorIcon/>
                            </IconButton>
                            <IconButton aria-label="delete"
                                        style={{position: "absolute", left: "120px", bottom: "7px"}} onClick={deleteAnIssue}>
                                <DeleteIcon/>
                            </IconButton>
                        </div> :
                        <div className={classes.state}
                             style={{
                                 position: "absolute",
                                 textAlign: "center",
                                 bottom: "10px",
                                 fontWeight: "bold",
                                 backgroundColor: backgroundColor
                             }}>
                            {convertAPIStatesToUI(issue.state).toLowerCase()}
                        </div>}
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
                    {isLogged && role === "ROLE_USER" ?
                        <div>
                            <div style={{position: "absolute", bottom: "5px", left: "9rem"}}>
                                {nrOfLikes}
                                <Checkbox icon={<ThumbUpOffAltIcon/>} checkedIcon={<ThumbUpIcon/>}
                                          checked={likeButton} onClick={handleLike}/>
                            </div>
                            <div style={{position: "absolute", bottom: "5px", right: "3px"}}>
                                {nrOfDislikes}
                                <Checkbox icon={<ThumbDownOffAltIcon/>} checkedIcon={<ThumbDownAltIcon/>}
                                          checked={dislikeButton} onClick={handleDislike}/>
                            </div>
                        </div> : ""}
                    {isLogged && role === "ROLE_ADMIN" ?
                        <div>
                            <div style={{position: "absolute", bottom: "5px", right: "4rem"}}>
                                {nrOfLikes}
                                <Checkbox icon={<ThumbUpOffAltIcon/>} checkedIcon={<ThumbUpIcon/>}
                                          disabled/>
                            </div>
                            <div style={{position: "absolute", bottom: "5px", right: "3px"}}>
                                {nrOfDislikes}
                                <Checkbox icon={<ThumbDownOffAltIcon/>} checkedIcon={<ThumbDownAltIcon/>}
                                          disabled/>
                            </div>
                        </div> : ""
                    }
                </CardBody>
            </Card>
        </div>
    );
};

export default CardItem2;
