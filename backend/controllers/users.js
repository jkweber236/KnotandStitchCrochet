const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getUser = async (req, res) => {
  const { uid } = req.params;

  try {
    // Query the "users" collection for the specified UID
    const response = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("users")
      .findOne({ uid });

    if (response) {
      // If the user is found, return their details
      res.status(200).json(response);
    } else {
      // If the user is not found, return a 404 error
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by UID:", error);
    // Return a 500 error for any server-side issues
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const createNewUser = async (req, res) => {
  const { uid, email, username, cartId } = req.body;

  // Basic validation to ensure we have required data
  if (!uid || !email || !username || !cartId) {
    return res
      .status(400)
      .json({ error: "UID, email, and username are required" });
  }

  const newUser = {
    uid: uid,
    email: email,
    username: username,
    cartId: cartId,
    createdAt: new Date(),
  };

  try {
    // Insert the new user into the database
    const response = await mongodb
      .getDb()
      .db("KnotandStitchCrochet")
      .collection("users")
      .insertOne(newUser);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: "Error inserting user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = { getUser, createNewUser };
