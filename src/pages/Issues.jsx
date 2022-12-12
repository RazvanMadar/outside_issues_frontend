import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import CardItem from "../components/ui/CardItem";
import CardItem2 from "../components/ui/CardItem2";
import classes from "./Issues.module.css";

const Issues = (props) => {
  // const issues_url = "http://localhost:8080/api/issues";
  const location = useLocation();

  const issues_url = location.state ? location.state : props.state;
  const [issues, setIssues] = useState([]);

  const getAllIssues = async () => {
    try {
      const response = await axios.get(issues_url);
      setIssues(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log(issues_url);
    getAllIssues();
  }, [issues_url]);

  return (
    <Container>
      {issues && (
        // <div
        //   style={{
        //     display: "flex",
        //     flexWrap: "wrap",
        //   }}
        // >
        <Row>
          {issues.map((elem) => (
            <Col
              className="bg-light border"
              // style={{ margin: "0", padding: "0" }}
            >
              <CardItem2 issue={elem} key={elem.id} />
            </Col>
          ))}
        </Row>
        // </div>
      )}
    </Container>
  );
};

export default Issues;
