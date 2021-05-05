import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user && cookies.user !== "") {
      history.push("/Profile");
    }
  }, []);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      const { data } = await axios({
        url: "http://localhost:8080/api/users/login",
        method: "post",
        data: {
          username: username,
          password: password,
        },
      });
      if (data["result"] == true) {
        setCookie("user", username, { path: "/" });
        history.push("/Profile");
      } else {
        setError("No user found with these credentials");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-container">
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
      <br />
      <p className="error">{error}</p>
      <Button onClick={handleSubmit} variant="outlined">
        Login
      </Button>
      <br />
      <br />
      <a href="/register">Don't have an account? Click here.</a>
    </div>
  );
}

export default Login;
