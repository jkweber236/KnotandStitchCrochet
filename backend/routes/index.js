const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/carts", require("./cart"));

module.exports = router;
