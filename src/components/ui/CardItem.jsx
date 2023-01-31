import Card from "react-bootstrap/Card";
import classes from "./CardItem.module.css";
import { thumbsOUp } from "react-icons-kit/fa/thumbsOUp";
import { thumbsODown } from "react-icons-kit/fa/thumbsODown";
import { Icon } from "react-icons-kit";
import { useState } from "react";
import DateFormat from "../layout/DateFormat";

const CardItem = (props) => {
  console.log(props.issue);

  const [likes, setLikes] = useState(props.issue.likesNumber);
  const [dislikes, setDislikes] = useState(props.issue.dislikesNumber);

  const addLikeHandler = () => {
    setLikes((prev) => prev + 1);
    console.log(new Date().toISOString());
  };

  const addDislikeHandler = () => {
    setDislikes((prev) => prev + 1);
  };

  return (
    <div className={classes.card}>
      <Card className={classes.maincard}>
        <div className={classes.uppercard}>
          <section>
            <span>
              {likes}{" "}
              <Icon onClick={addLikeHandler} icon={thumbsOUp} size={16} />
            </span>
            <span>
              {dislikes}{" "}
              <Icon onClick={addDislikeHandler} icon={thumbsODown} size={16} />
            </span>
          </section>
          <span className={classes.state}>{props.issue.state}</span>
          {likes > 9 && (
            <span className={classes.state} style={{ backgroundColor: "red" }}>
              URGENT
            </span>
          )}
          <div className={classes.cardbody}>
            <Card.Img
              variant="top"
              src={props.issue.photo}
              // style={{ width: "50%" }}
            />
            {/* <Card.Title>{props.issue.type}</Card.Title> */}
            <div className={classes.date}>
              <DateFormat
                date={new Date(props.issue.reportedDate.replace(" ", "T"))}
              />
            </div>
          </div>
          <Card.Title>{props.issue.type}</Card.Title>
          <Card.Body>
            <Card.Text>{props.issue.description}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default CardItem;
