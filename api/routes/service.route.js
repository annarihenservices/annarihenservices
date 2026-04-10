const express = require("express");

const {
  createService,
  deleteService,
  updateService,
  singleService,
  getAllServices,
} = require("../controllers/service.controller.js");

const router = express.Router();

router.post("/", createService);
router.delete("/:id", deleteService);
router.put("/:id", updateService);
router.get("/:id", singleService);
router.get("/", getAllServices);

module.exports = router;