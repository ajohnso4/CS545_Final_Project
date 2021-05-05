const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const helper = require("./_helper");

async function getAll() {
  const res = await helper.getAll(users);
  return res;
}

async function get(id) {
  return await helper.getById(users, id, "user");
}

async function login(body) {
  let users = await getAll();
  for (let i = 0; i < users.length; i++) {
    if (users[i]["username"] == body["username"]) {
      if (users[i]["password"] == body["password"]) {
        return true;
      }
    }
  }
  return false;
}

async function getIdFromUsername(username) {
  let users = await getAll();
  for (let i = 0; i < users.length; i++) {
    if (users[i]["username"] === username) {
      return users[i]["_id"];
    }
  }
  return -1;
}

async function addFav(body) {
  let userId = await getIdFromUsername(body["username"]);
  let user = await get(userId);
  if (userId == -1) throw "No user found";
  if (user["favorites"] !== undefined) {
    if (!user["favorites"].includes(body["favId"]))
      user["favorites"].push(body["favId"]);
  } else {
    user["favorites"] = [body["favId"]];
  }
  let favs = user["favorites"];
  try {
    let t = await helper.update(users, userId, { favorites: favs }, "user");
    return t;
  } catch (e) {
    console.log(e);
  }
}

async function remFav(body) {
  let userId = await getIdFromUsername(body["username"]);
  let user = await get(userId);
  if (userId == -1) throw "No user found";

  let favs = user["favorites"];
  favs.splice(favs.indexOf(body["favId"]), 1);

  try {
    let t = await helper.update(users, userId, { favorites: favs }, "user");
    return t;
  } catch (e) {
    console.log(e);
  }
}

async function create(body) {
  body["favorites"] = [];
  return await helper.create(users, body, "user");
}

module.exports = {
  getAll,
  create,
  addFav,
  login,
  get,
  remFav,
};
