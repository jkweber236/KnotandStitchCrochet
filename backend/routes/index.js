const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/products", require("./products"));
router.use("/checkout", require("./checkout"));

module.exports = router;
