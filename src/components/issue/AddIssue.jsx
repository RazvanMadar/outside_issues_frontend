import axios from "axios";
import { useRef, useState } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";

import classes from "../citizen/LoginForm.module.css";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyC_FreknUyI8AGqkgt8pZ6w7hEHDa9IKEY");

const AddIssue = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const photoInputRef = useRef();
  const typeInputRef = useRef();
  const descriptionInputRef = useRef();

  const geoLocation = useGeoLocation();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredPhoto = photoInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    // geoLocation.loaded
    //   ? JSON.stringify(geoLocation)
    //   : "Location data not available yet.";

    const issue = {
      photo: enteredPhoto,
      type: enteredType,
      state: "REGISTERED",
      reportedDate: new Date().toISOString(),
      likesNumber: 0,
      dislikesNumber: 0,
      description: enteredDescription,
    };
    setErrorMessage("");
    axios
      .post("http://localhost:8080/api/add-issue", issue)
      .then(() => {
        setErrorMessage("");
        console.log("Added!");
        photoInputRef.current.value = "";
        typeInputRef.current.value = "";
        descriptionInputRef.current.value = "";
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Add an issue</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="photo">Photo</label>
          <input
            type="text"
            id="photo"
            ref={photoInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            ref={typeInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            ref={descriptionInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <section>
          {!!errorMessage && <p style={{ color: "white" }}>{errorMessage}</p>}
        </section>
        <div className={classes.actions}>
          <button>Add</button>
        </div>
      </form>
    </section>
  );
};

export default AddIssue;
