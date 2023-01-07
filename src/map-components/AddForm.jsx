import React, {useRef, useState} from "react";
import {Form, FormGroup, Input, Label, Row} from "reactstrap";
import Button from "@mui/material/Button";
import {addIssue} from "../api/issue-api";
import ImageBox from "./ImageBox";
import classes from "./AddForm.module.css";
import {CategoryData} from "../staticdata/CategoryData";
import {addImage} from "../api/issue-image-api";
import Checkbox from '@mui/material/Checkbox';

const AddForm = ({passIsShown, passIsIssueAdded, markerPosition}) => {
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const [forbidden, setForbidden] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [photos, setPhotos] = useState([]);
    const checkbox = useRef(null);

    const addAnIssue = (issue) => {
        console.log(issue);
        return addIssue(issue, (result, status, err) => {
            if (result !== null && status === 201) {
                console.log(result);
                setAuthorized(true);
                passIsIssueAdded((prev) => !prev);
                addAnImage(result);
            } else if (status === 403) {
                setForbidden(true);
            } else {
                console.log(err);
            }
        });
    };

    const getNumberFromIndex = (index) => {
        if (index === 0)
            return "FIRST";
        if (index === 1)
            return "SECOND";
        return "THIRD";
    }

    const addAnImage = (id) => {
        photos.map((img, index) => {
            return addImage(id, img, getNumberFromIndex(index), (result, status, err) => {
                if (result !== null && status === 201) {
                    console.log(result);
                    setAuthorized(true);
                } else if (status === 403) {
                    setForbidden(true);
                } else {
                    console.log(err);
                }
            })
        });
    };

    const formatCategory = (category) => {
        return category.split(' ').length < 2 ? category.toUpperCase() : category.replace(' ', '_').toUpperCase();
    }
    console.log(markerPosition)
    const getCurrentDate = () => {
        const currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        if (day.toString().length < 2)
            day = "0" + day;
        if (month.toString().length < 2)
            month = "0" + month;
        return `${year}-${month}-${day}`;
    }

    const checkIfLocation = () => {
        return checkbox.current.checked ? markerPosition : {lat: 0.0, lng: 0.0};
    }

    const hasLocation = () => {
        return !!checkbox.current.checked;
    }

    return (
        <div className={classes.wrapper}>
            <Form>
                <Row>
                    <ImageBox passIsPhoto={setPhotos}/>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="select" name="category" id="category" innerRef={categoryInputRef}
                               placeholder="road">
                            <option selected disabled hidden>Issue category</option>
                            {CategoryData.map((cat) => <option style={{maxWidth: "1rem"}}>{cat.title}</option>)}
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input style={{resize: "none"}}
                               id="description"
                               name="description"
                               type="textarea"
                               innerRef={descriptionInputRef}
                               placeholder="Write the description..."
                        />
                        <span>Use marker location for issue</span>
                        <Checkbox defaultChecked color="success" inputRef={checkbox}/>
                    </FormGroup>
                </Row>
            </Form>
            <Button
                variant="contained"
                color="success"
                style={{position: "absolute", left: "1rem", width: "8rem"}}
                onClick={() => {
                    passIsShown(false);
                    addAnIssue({
                        type: formatCategory(categoryInputRef.current.value),
                        state: "REGISTERED",
                        reportedDate: getCurrentDate(),
                        description: descriptionInputRef.current.value,
                        likesNumber: 0,
                        dislikesNumber: 0,
                        address: checkIfLocation(),
                        hasLocation: hasLocation(),
                        citizenId: 1
                    });
                }}
            >
                Add
            </Button>
            <Button
                variant="contained"
                color="error"
                style={{position: "absolute", right: "1rem", width: "8rem"}}
                onClick={() => passIsShown(false)}
            >
                Cancel
            </Button>
        </div>
    );
};

export default AddForm;
