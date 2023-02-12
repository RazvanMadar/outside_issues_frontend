import React, {useEffect, useRef, useState} from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle,} from "reactstrap";
import {getFirstImage} from "../../api/issue-image-api";
import Resizer from "react-image-file-resizer";
import DateFormat from "../layout/DateFormat";
import classes from "./CardItem.module.css";
import {convertAPIStatesToUI, convertAPITypesToUI, cutFromDescription} from "../../common/utils";
import Checkbox from '@mui/material/Checkbox';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import noPhoto from "../../pages/images/no_photo.png";

const CardItem2 = ({issue}) => {
    const [mainImage, setMainImage] = useState(null);
    const [forbidden, setForbidden] = useState(null);
    const isLogged = sessionStorage.getItem("isLogged");
    const [likeButton, setLikeButton] = useState(false);
    const [dislikeButton, setDislikeButton] = useState(false);
    const [nrOfLikes, setNrOfLikes] = useState(issue.likesNumber);
    const [nrOfDislikes, setNrOfDislikes] = useState(issue.dislikesNumber);

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

    const handleLike = () => {
        if (likeButton) {
            setLikeButton(false);
            setNrOfLikes((prev) => prev - 1);
        } else {
            setLikeButton(true);
            setNrOfLikes((prev) => prev + 1);
            if (dislikeButton) {
                setNrOfDislikes((prev) => prev - 1);
            }
            setDislikeButton(false);
        }
    }

    const handleDislike = () => {
        if (dislikeButton) {
            setDislikeButton(false);
            setNrOfDislikes((prev) => prev - 1);
        } else {
            setDislikeButton(true);
            setNrOfDislikes((prev) => prev + 1);
            if (likeButton) {
                setNrOfLikes((prev) => prev - 1);
            }
            setLikeButton(false);
        }
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
    }, [issue.id]);

    return (
        <div
            style={{
                display: "inline",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "0 15% 10% 0",
                fontSize: "small",
            }}
        >
            <Card
                accessKey={issue.id}
                style={{
                    width: "17rem",
                    height: "21rem"
                }}
            >
                {/*<div style={{backgroundImage: "{{mainImage}}", backgroundSize: "cover", height: "70%", width: "70%", backgroundRepeat: "no-repeat"}}>*/}
                <img alt="" style={{height: "10rem", padding: "5px", borderRadius: "5%"}}
                     src={mainImage}/>
                {/*</div>*/}
                <CardBody>
                    <CardTitle tag="h5" style={{textAlign: "center"}}>{convertAPITypesToUI(issue.type)}</CardTitle>
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
                    <div className={classes.state}
                         style={{position: "absolute", textAlign: "center", bottom: "10px", fontWeight: "bold"}}>
                        {/*<img alt="Image not found" style={{height: "5rem", width: "6rem", padding: "5px", borderRadius: "5%"}} src={registeredImage}/>*/}
                        {convertAPIStatesToUI(issue.state)}
                    </div>
                    {isLogged ?
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
                </CardBody>
            </Card>
        </div>
    );
};

export default CardItem2;
