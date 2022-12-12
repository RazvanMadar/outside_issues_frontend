import axios from "axios";
import { useRef, useState } from "react";

import classes from "./LoginForm.module.css";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const user = {
      username: enteredUsername,
      password: enteredPassword,
      email: enteredEmail,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      userType: "CANDIDATE",
    };

    setErrorMessage("");
    axios
      .post("http://localhost:8080/api/register", user)
      .then(() => {
        setErrorMessage("");
        console.log("Created!");
        usernameInputRef.current.value = "";
        passwordInputRef.current.value = "";
        emailInputRef.current.value = "";
        firstNameInputRef.current.value = "";
        lastNameInputRef.current.value = "";
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            ref={firstNameInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            ref={lastNameInputRef}
            placeholder="Insert here..."
            required
          />
        </div>
        <section>
          {!!errorMessage && <p style={{ color: "white" }}>{errorMessage}</p>}
        </section>
        <div className={classes.actions}>
          <button>Create Account</button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
