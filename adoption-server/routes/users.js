const { request } = require("express");
const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/", async (req, res) => {
  try {
    const users = await userData.getAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const status = await userData.login(req.body);
    res.status(200).json({ result: status });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const status = await userData.create(req.body);
    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/addFavorite", async (req, res) => {
  try {
    const status = await userData.addFav(req.body);
    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/remFavorite", async (req, res) => {
  try {
    const status = await userData.remFav(req.body);
    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
