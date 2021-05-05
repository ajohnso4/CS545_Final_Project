const pets = require("./pets");
const users = require("./users");

const contructorMethod = (app) => {
  app.use("/api/pets", pets);
  app.use("/api/users", users);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
  });
};

module.exports = contructorMethod;
