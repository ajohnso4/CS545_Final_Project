import React, { useEffect, useState } from "react";
import "./profile.css";
import { useCookies } from "react-cookie";
import {
  Button,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Profile() {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["user", "email"]);
  const [data, setData] = useState([]);

  function logout() {
    removeCookie("user");
    removeCookie("email");
    history.push("/");
  }

  async function removeFromFavorites(favId) {
    try {
      const dataRes = await axios({
        url: "http://localhost:8080/api/users/remFavorite",
        method: "put",
        data: {
          favId: favId,
          username: cookies.user,
        },
      });
      let d = data;
      d.splice(d.indexOf(favId), 1);
      setData(d);
      console.log(dataRes);
    } catch (e) {
      console.log(e.message);
    }
  }

  function addPet() {
    history.push("/Add");
  }

  useEffect(() => {
    async function fetch() {
      const users = await axios
        .get("http://localhost:8080/api/users/")
        .then((res) => {
          let d = res.data;
          let ids = [];
          for (let i = 0; i < d.length; i++) {
            if (d[i]["username"] == cookies.user) {
              if (d[i]["favorites"]) {
                ids.push(d[i]["favorites"]);
              }
            }
          }
          let bigData = [];
          axios.get("http://localhost:8080/api/pets/").then((res) => {
            let dd = res.data;
            for (let j = 0; j < dd.length; j++) {
              console.log(ids[0]);
              console.log(dd[j]);
              if (ids[0] == undefined) {
                setData([]);
                return;
              }
              if (ids[0].includes(dd[j]["_id"])) {
                bigData.push(dd[j]);
              }
            }
            console.log(bigData);
            setData(bigData);
          });
        });
    }
    fetch();
  }, [cookies.user, data]);

  return (
    <div className="profile-container">
      <h1>Hello, {cookies.user}</h1>
      <Button onClick={addPet} variant="outlined">
        Add Pet
      </Button>{" "}
      <Button onClick={logout} variant="outlined">
        Logout
      </Button>
      <br />
      <br />
      <h2>Email: {cookies.email}</h2>
      <br />
      <br />
      <h2>Favorites</h2>
      <Divider />
      <Grid container className="gridForIm" spacing={2}>
        {data.map((item, index) => {
          return (
            <Grid key={index} item xs={2} s={2} m={3} l={3} xl={4}>
              <Card className="cardInd">
                <CardMedia style={{ height: 350 }} image={item["img"]} />
                <CardContent>
                  <h1>{item["name"]}</h1>
                  <Divider></Divider>
                  <ul>
                    <li>Age: {item["age"]}</li>
                    <li>Sex: {item["sex"]}</li>
                  </ul>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    onClick={() => {
                      removeFromFavorites(item["_id"]);
                    }}
                    aria-label="remove from favorites"
                  >
                    <RemoveCircleIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Profile;
