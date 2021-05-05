import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  CircularProgress,
  Select,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import "./AddPet.css";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

function AddPet() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [url, setUrl] = useState("");
  const [selected, setSelected] = useState("Dog");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "email"]);

  function handleName(event) {
    setName(event.target.value);
  }

  function handleAge(event) {
    setAge(event.target.value);
  }

  function handleSex(event) {
    setSex(event.target.value);
  }

  function handleLink(event) {
    setUrl(event.target.value);
  }

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  async function submit() {
    if (
      name == "" ||
      age.trim() == "" ||
      sex.trim() == "" ||
      url.trim() == ""
    ) {
      setError("Please fill out all inputs");
      return;
    }

    setLoading(true);
    axios({
      url: "http://localhost:8080/api/pets",
      method: "post",
      data: {
        name: name,
        sex: sex,
        age: age,
        img: url,
        type: selected,
        email: cookies.email
      },
    })
      .then(() => {
        console.log("Success!");
        setLoading(false);
        history.push("/");
      })
      .catch((e) => {
        setError(e);
      });
  }

  return (
    <FormGroup className="add-container">
      <h1>Add Pet</h1>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={handleName}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <FormHelperText id="my-helper-text">Your Pet's Name</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Age</InputLabel>
        <Input
          onChange={handleAge}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <FormHelperText id="my-helper-text">Your Pet's Age</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Sex</InputLabel>
        <Input
          onChange={handleSex}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <FormHelperText id="my-helper-text">Your Pet's Sex</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Img</InputLabel>
        <Input
          onChange={handleLink}
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <FormHelperText id="my-helper-text">
          Image URL for Your Pet
        </FormHelperText>
        <br />
        <Select
          className="selectObj"
          native
          id="demo-customized-select-native"
          label={selected}
          value={selected}
          onChange={handleChange}
        >
          <option value={"Dog"}>Dog</option>
          <option value={"Cat"}>Cat</option>
          <option value={"Parrot"}>Parrot</option>
        </Select>
      </FormControl>
      <p>{error}</p>
      <br />
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <Button onClick={submit} variant="outlined">
          Submit
        </Button>
      )}
    </FormGroup>
  );
}

export default AddPet;
