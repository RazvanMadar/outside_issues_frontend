import React, {useEffect, useState} from "react";
import {Card, CardBody, CardSubtitle, CardText, CardTitle,} from "reactstrap";
import {getFirstImage} from "../../api/issue-image-api";
import DateFormat from "./DateFormat";
import classes from "./CardItem.module.css";
import {convertAPIStatesToUI, convertAPITypesToUI, cutFromDescription, getBackgroundColorForState, getImageRegardingIssueType} from "../../common/utils";

const CardItem3 = ({issue, passBackgroundColor}) => {
    const [mainImage, setMainImage] = useState(null);
    const [forbidden, setForbidden] = useState(null);
    const [nrOfLikes, setNrOfLikes] = useState(issue.likesNumber);
    const backgroundColor = getBackgroundColorForState(issue.state);
    const token = localStorage.getItem("token")

    const geMainImage = () => {
        return getFirstImage(token, issue.id, (result, status, err) => {
            if (result !== null && status === 200) {
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
                    <CardText style={{textAlign: "center"}}>
                        {cutFromDescription(issue.description)}
                    </CardText>
                    <div className={classes.date}>
                        <DateFormat
                            date={new Date(issue.reportedDate.replace(" ", "T"))}
                        />
                    </div>
                    {nrOfLikes > 2 && issue.state !== 'SOLVED' ?
                        <div className={classes.urgent}
                             style={{position: "absolute", top: "10px", left: "10px", fontWeight: "bold"}}>
                            prioritar
                        </div> : ""
                    }
                    <div className={classes.state}
                         style={{position: "absolute", textAlign: "center", bottom: "10px", fontWeight: "bold",
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
