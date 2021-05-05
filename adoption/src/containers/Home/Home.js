import React, { useEffect, useState } from "react";
import {
  Select,
  Divider,
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
import "./home.css";
import { useCookies } from "react-cookie";

const Home = ({ search }) => {
  const [selected, setSelected] = useState("Dog");
  const [results, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["user"]);
  const [favs, setFavs] = useState([]);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  async function addFavorite(favId) {
    try {
      const dataRes = await axios({
        url: "http://localhost:8080/api/users/addFavorite",
        method: "put",
        data: {
          favId: favId,
          username: cookies.user,
        },
      });
      let d = favs;
      favs.push(favId);
      setFavs(d);
      console.log(dataRes);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get("http://localhost:8080/api/pets/");
        setRes(res);
        const users = await axios
          .get("http://localhost:8080/api/users/")
          .then((res) => {
            let d = res.data;
            for (let i = 0; i < d.length; i++) {
              if (d[i]["username"] == cookies.user) {
                if (d[i]["favorites"]) {
                  setFavs(d[i]["favorites"]);
                }
              }
            }
          });

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
    fetch();
  }, [favs]);

  console.log(favs);

  return (
    <div>
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
      <Divider variant="middle" />
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <Grid container className="gridForIm" spacing={2}>
          {results
            ? results.data.map((item, index) => {
              if (search !== "") {
                let s = item["name"] + "" + item["type"];
                if (!s.toUpperCase().includes(search.toUpperCase()))
                  return <p></p>;
                return (
                  <Grid key={index} item xs={1} s={1} m={2} l={3} xl={3}>
                    <Card className="cardInd">
                      <CardMedia
                        style={{ height: 350 }}
                        image={item["img"]}
                      />
                      <CardContent>
                        <h1>{item["name"]}</h1>
                        <Divider></Divider>
                        <ul>
                          <li>Age: {item["age"]}</li>
                          <li>Sex: {item["sex"]}</li>
                          <li>Contact: {item["email"]}</li>
                        </ul>
                      </CardContent>
                      <CardActions disableSpacing>
                        {favs.includes(item["_id"]) ? null : cookies.user ? (
                          <IconButton
                            onClick={addFavorite}
                            aria-label="add to favorites"
                          >
                            <FavoriteIcon key={index} />
                          </IconButton>
                        ) : (
                          <p>Login to favorite</p>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }
              if (item["type"] === selected) {
                return (
                  <Grid key={index} item xs={2} s={2} m={3} l={3} xl={4}>
                    <Card className="cardInd">
                      <CardMedia
                        style={{ height: 400 }}
                        image={item["img"]}
                      />
                      <CardContent>
                        <h1>{item["name"]}</h1>
                        <Divider></Divider>
                        <ul>
                          <li>Age: {item["age"]}</li>
                          <li>Sex: {item["sex"]}</li>
                          <li>Contact: {item["email"]}</li>
                        </ul>
                      </CardContent>
                      <CardActions disableSpacing>
                        {favs.includes(item["_id"]) ? null : cookies.user ? (
                          <IconButton
                            onClick={() => {
                              addFavorite(item["_id"]);
                            }}
                            aria-label="add to favorites"
                          >
                            <FavoriteIcon />
                          </IconButton>
                        ) : (
                          <p>Login to favorite</p>
                        )}
                      </CardActions>
                    </Card>
                  </Grid>
                );
              } else {
                return <p></p>;
              }
            })
            : null}
        </Grid>
      )}
    </div>
  );
};

export default Home;
