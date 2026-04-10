const express = require("express");

const {
  deleteUser,
  updateUser,
  getUser,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/:id", getUser);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;