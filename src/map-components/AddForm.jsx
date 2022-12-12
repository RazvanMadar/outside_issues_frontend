import React from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { addIssue } from "../api/issue-api";
import ImageBox from "./ImageBox";

const AddForm = (props) => {
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const photoInputRef = useRef();
  const [forbidden, setForbidden] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  // const addAnIssue = (issue) => {
  //   return addIssue(issue, (result, status, err) => {
  //     if (result !== null && status === 201) {
  //       console.log(result);
  //       setAuthorized(true);
  //       setDevices(result);
  //     } else if (status === 403) {
  //       setForbidden(true);
  //     } else {
  //       console.log(err);
  //     }
  //   });
  // };

  return (
    <div>
      <Form>
        <Row>
          <ImageBox />
        </Row>
        <Row>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="Select category"
              type="text"
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Write the description..."
            />
          </FormGroup>
        </Row>
      </Form>
      <Button
        variant="outlined"
        color="error"
        onClick={() => props.passIsShown(false)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default AddForm;
