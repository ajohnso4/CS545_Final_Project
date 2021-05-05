const { request } = require("express");
const express = require("express");
const router = express.Router();
const data = require("../data");
const petData = data.pets;

router.get("/", async (req, res) => {
  try {
    const pets = await petData.getAll();
    res.status(200).json(pets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const status = await petData.create(req.body);
    res.status(200).json(status);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
