import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["user", "email"]);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handlePassword2(event) {
    setPassword2(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {
    if (username.length < 8) {
      setError("Username must be atleast of length 8");
      return;
    }
    if (password.length < 8) {
      setError("Password must be atleast of length 8");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios({
        url: "http://localhost:8080/api/users/register",
        method: "post",
        data: {
          username: username,
          password: password,
          email: email
        },
      });
      if (typeof data !== "string") {
        setCookie("user", username, { path: "/" });
        setCookie("email", email, { path: "/" });
        history.push("/Profile");
      } else {
        setError("No user found with these credentials");
      }
    } catch (e) {
      setError(e);
      console.log(e);
    }
  }

  return (
    <div className="register-container">
      <TextField
        id="username"
        label="Username"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleUsername}
      />
      <br /> <br />
      <TextField
        id="password"
        label="Password"
        type="password"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handlePassword}
      />
      <br /> <br />
      <TextField
        id="password2"
        label="Re-Type Password"
        type="password"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handlePassword2}
      />
      <br /> <br />
      <TextField
        id="email"
        label="Email"
        type="email"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleEmail}
      />
      <br />
      <p>{error}</p>
      <Button onClick={handleSubmit} variant="outlined">
        Create Account
      </Button>
      <br />
      <br />
      <a href="/Login">Already have an account? Click here.</a>
    </div>
  );
}

export default Register;
