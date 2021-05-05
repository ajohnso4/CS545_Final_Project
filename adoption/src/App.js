import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import { InputBase, Link } from "@material-ui/core";
import Login from "./containers/Login/Login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import Register from "./containers/Register/Register";
import Profile from "./containers/Profile/Profile";
import AddPet from "./containers/AddPet/AddPet";

function App() {
  const [search, setSearch] = useState("");

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Petfinder</h1>
          <a className="home-button" href="/">
            <HomeIcon fontSize="large" />
          </a>
          <InputBase
            className="search"
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
          <a className="profile-button" href="/login">
            <AccountCircle fontSize="large" />
          </a>
        </header>
        <div className="App-body">
          <Route exact path="/">
            <Home search={search} />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/Add">
            <AddPet />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
