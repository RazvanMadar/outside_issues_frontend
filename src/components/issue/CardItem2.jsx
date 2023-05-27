import React, {useEffect, useRef, useState} from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle, Input,} from "reactstrap";
import {getFirstImage} from "../../api/issue-image-api";
import DateFormat from "./DateFormat";
import classes from "./CardItem.module.css";
import {convertAPIStatesToUI, convertAPITypesToUI, cutFromDescription, getBackgroundColorForState, getImageRegardingIssueType} from "../../common/utils";
import Checkbox from '@mui/material/Checkbox';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import {getReactionsForSomeCitizenAndIssue} from "../../api/citizen-reactions-api";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {deleteIssueById} from "../../api/issue-api";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {sendEmail} from "../../api/email-api";
import {addRejected} from "../../api/rejected-issues-api";
import IssueModal from "../../modal/IssueModal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CardItem2 = ({issue, passIsDeleted, passBackgroundColor, passIsUpdated}) => {
    const [mainImage, setMainImage] = useState(null);
    const [forbidden, setForbidden] = useState(null);
    const [likeButton, setLikeButton] = useState(false);
    const [dislikeButton, setDislikeButton] = useState(false);
    const [nrOfLikes, setNrOfLikes] = useState(issue.likesNumber);
    const [nrOfDislikes, setNrOfDislikes] = useState(issue.dislikesNumber);
    const [openDialog, setOpenDialog] = useState(false);
    const deleteReasonInputRef = useRef('');
    const isLogged = localStorage.getItem("isLogged");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const backgroundColor = getBackgroundColorForState(issue.state);
    const [modalShow, setModalShow] = useState(false);
    const isAdmin = "ROLE_ADMIN" === localStorage.getItem("role") ? true : false;
    const token = localStorage.getItem("token")

    const getReactionsForCurrentUserAndIssue = () => {
        if (!isAdmin) {
            return getReactionsForSomeCitizenAndIssue(token, userId, issue.id, (result, status, err) => {
                if (status === 200) {
                    if (result !== null && result === 1) {
                        setLikeButton(true);
                    } else if (result !== null && result === -1) {
                        setDislikeButton(true);
                    }
                } else {
                    console.log(err);
                }
            });
        }
    };

    const geMainImage = () => {
        return getFirstImage(token, issue.id, (result, status, err) => {
            if (result !== null && status === 200) {
                setMainImage(URL.createObjectURL(result));
            } else if (status === 403) {
                setForbidden(true);
            } else {
                setMainImage(getImageRegardingIssueType(issue.type));
            }
        });
    };

    const sendAnEmail = (data) => {
        return sendEmail(token, data, (result, status, err) => {
            if (status === 403) {
                setForbidden(true);
            }
        })
    }

    const deleteAnIssue = () => {
        return deleteIssueById(token, issue.id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                rejectIssue();
                let content = `Sesizarea cu numărul ${issue.id}, făcută de dumneavoastră, de tipul ${convertAPITypesToUI(issue.type)} (${issue.actualLocation}) a fost ștearsă.`;
                if (deleteReasonInputRef.current.value.length > 0)
                    content += `\nMotiv: ${deleteReasonInputRef.current.value}`;
                sendAnEmail({
                    subject: "Sesizare Primăria Oradea", toEmail: issue.citizenEmail, content: content, issueId: issue.id
                });
            }
        });
    };

    const rejectIssue = () => {
        return addRejected(token, issue.citizenEmail, (result, status, err) => {
            if (result !== null && status === 201) {
                console.log(result);
                passIsDeleted((prev) => !prev)
            }
        });
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleLike = () => {
        if (likeButton) {
            setLikeButton(false);
            setNrOfLikes((prev) => prev - 1);
            updateLocalStorageWithReactions(0);
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

    useEffect(() => {
        geMainImage();
        getReactionsForCurrentUserAndIssue();
    }, [issue.id, issue]);

    return (
        <div className={classes.bigWrapper}>
            <Card
                accessKey={issue.id}
                style={{width: "18rem", height: "22rem",
                    backgroundColor: passBackgroundColor === 'white' ? 'white' : "#BCBEC8", boxShadow: "7px 5px 5px grey"
                }}
            >
                <img alt="" className={classes.mainImage}
                     src={mainImage}/>
                <CardBody>
                    <CardTitle tag="h5" style={{textAlign: "center"}}>
                        {convertAPITypesToUI(issue.type)}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6" style={{textAlign: "center"}}>
                        {issue.actualLocation}
                    </CardSubtitle>
                    {issue.citizenEmail !== null ? <CardText style={{textAlign: "center"}}>{cutFromDescription(issue.description)}</CardText> :
                        <CardText style={{textAlign: "center", color: "red", fontWeight: "bold"}}>SENZOR PLATFORMĂ</CardText>}
                    <div className={classes.date}>
                        <DateFormat
                            date={new Date(issue.reportedDate.replace(" ", "T"))}
                        />
                    </div>
                    {isLogged && role === "ROLE_ADMIN" ?
                        <div>
                            <div className={classes.state}
                                 style={{position: "absolute", textAlign: "center", bottom: "10px", left: "5px",
                                     fontWeight: "bold", backgroundColor: backgroundColor
                                 }}>
                                {convertAPIStatesToUI(issue.state).toLowerCase()}
                            </div>
                            <IconButton aria-label="edit" style={{position: "absolute", left: "85px", bottom: "7px"}}
                                        onClick={() => setModalShow(true)}
                            >
                                <BorderColorIcon/>
                            </IconButton>
                            <IconButton aria-label="delete"
                                        style={{position: "absolute", left: "120px", bottom: "7px"}}
                                        onClick={handleOpenDialog}>
                                <DeleteIcon/>
                            </IconButton>
                            <Dialog
                                open={openDialog}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleCloseDialog}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Sunteți sigur că doriți să ștergeți această sesizare?"}</DialogTitle>
                                <DialogContent>
                                    <Input style={{resize: "none", textDecoration: "none", marginTop: "5px"}}
                                           id="description"
                                           name="description"
                                           type="textarea"
                                           innerRef={deleteReasonInputRef}
                                           placeholder="Motivul ștergerii..."
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={deleteAnIssue}>Șterge</Button>
                                    <Button onClick={handleCloseDialog}>Închide</Button>
                                </DialogActions>
                            </Dialog>
                        </div> :
                        <div className={classes.state}
                             style={{position: "absolute", textAlign: "center", bottom: "10px", fontWeight: "bold",
                                 backgroundColor: backgroundColor
                             }}>
                            {convertAPIStatesToUI(issue.state).toLowerCase()}
                        </div>}
                    {nrOfLikes > 0 && issue.state !== 'SOLVED' ?
                        <div className={classes.urgent} style={{
                            position: "absolute", top: "10px", left: "10px", fontWeight: "bold"
                        }}>
                            prioritar
                        </div> : ""
                    }
                    {isLogged && role === "ROLE_USER" && issue.state !== "SOLVED" ?
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
                    {isLogged && role === "ROLE_USER" && issue.state === "SOLVED" ?
                        <div>
                            <div style={{position: "absolute", bottom: "5px", left: "9rem"}}>
                                {nrOfLikes}
                                <Checkbox icon={<ThumbUpOffAltIcon/>} disabled/>
                            </div>
                            <div style={{position: "absolute", bottom: "5px", right: "3px"}}>
                                {nrOfDislikes}
                                <Checkbox icon={<ThumbDownOffAltIcon/>} disabled/>
                            </div>
                        </div> : ""}
                    {!isLogged || isLogged && role === "ROLE_ADMIN" ?
                        <div>
                            <div style={{position: "absolute", bottom: "5px", right: "4rem"}}>
                                {nrOfLikes}
                                <Checkbox icon={<ThumbUpOffAltIcon/>} disabled/>
                            </div>
                            <div style={{position: "absolute", bottom: "5px", right: "3px"}}>
                                {nrOfDislikes}
                                <Checkbox icon={<ThumbDownOffAltIcon/>} disabled/>
                            </div>
                        </div> : ""
                    }
                </CardBody>
            </Card>
            {isAdmin && modalShow && <IssueModal show={modalShow} issue={issue} onHide={() => setModalShow(false)}
                                    passIsUpdated={passIsUpdated} passBackgroundColor={passBackgroundColor}/>}
        </div>
    );
};

export default CardItem2;
