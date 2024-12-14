const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/carts", require("./cart"));
router.use("/purchase", require("./purchase"));
router.use("/checkout", require("./checkout"));

module.exports = router;
