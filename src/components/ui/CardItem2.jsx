import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
} from "reactstrap";

const CardItem2 = (props) => {
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
        style={{
          width: "18rem",
        }}
      >
        <img alt="Not found" src="https://picsum.photos/400/300" />
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Card subtitle
          </CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card‘s content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardItem2;
