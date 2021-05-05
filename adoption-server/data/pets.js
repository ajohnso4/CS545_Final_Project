const mongoCollections = require("../config/mongoCollections");
const pets = mongoCollections.animals;
const helper = require("./_helper");

async function getAll() {
  const res = await helper.getAll(pets);
  return res;
}

async function create(body) {
  return await helper.create(pets, body, "pet");
}

module.exports = {
  getAll,
  create,
};
