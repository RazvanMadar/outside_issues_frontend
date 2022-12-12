import axios from "axios";
import { useState, useRef, useContext } from "react";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const url = "http://localhost:8080/login";
    const data = { email: enteredEmail, password: enteredPassword };
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data),
      url,
    };
    axios(options);

    // const loginDetails = {
    //   username: enteredUsername,
    //   password: enteredPassword,
    // };

    // setErrorMessage("");
    // axios
    //   .post("http://localhost:8080/login", loginDetails)
    //   .then((response) => {
    //     setErrorMessage("");
    //     console.log(response.data);
    //     console.log("Logged in!");
    //   })
    //   .catch((err) => {
    //     //console.log(err.response.data.message);
    //     //setErrorMessage(err.response.data.message);
    //     console.log(err);
    //   });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            ref={emailInputRef}
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
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
