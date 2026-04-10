const express = require("express");

const {
  createConsultation,
  deleteConsultation,
  updateConsultation,
  singleConsultation,
  getAllConsultations,
} = require("../controllers/consultation.controller.js");

const router = express.Router();

router.post("/", createConsultation);
router.delete("/:id", deleteConsultation);
router.put("/:id", updateConsultation);
router.get("/:id", singleConsultation);
router.get("/", getAllConsultations);

module.exports = router;