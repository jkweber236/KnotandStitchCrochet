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

const getProductById = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const product = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("products")
      .find({ _id: productId })
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(product[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAll, getProductById };
