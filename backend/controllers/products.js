const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const lists = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("products")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAll };
