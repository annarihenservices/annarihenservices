const Consultation = require("../models/consultation.models.js");
const { throwError } = require("../utils/error.js");

//===== Create Consultation =====//
const createConsultation = async (req, res, next) => {
  try {
    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);
  } catch (error) {
    next(error);
  }
};

//====== Handle Delete ========//
const deleteConsultation = async (req, res, next) => {
  try {
    const isConsultationExist = await Consultation.findById(req.params.id);
    if (!isConsultationExist)
      return next(throwError(404, "Consultation not found"));

    await Consultation.findByIdAndDelete(req.params.id);
    res.status(200).json("Consultation deleted successfully");
  } catch (error) {
    next(error);
  }
};

//===== Handle Consultation Update ======//
const updateConsultation = async (req, res, next) => {
  try {
    const isConsultationExist = await Consultation.findById(req.params.id);
    if (!isConsultationExist)
      return next(throwError(404, "Consultation not found"));

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedConsultation);
  } catch (error) {
    next(error);
  }
};

//===== Get A Single Consultation ====//
const singleConsultation = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation)
      return next(throwError(404, "Consultation not found"));

    res.status(200).json(consultation);
  } catch (error) {
    next(error);
  }
};

//==== Get All Consultations ====//
const getAllConsultations = async (req, res, next) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json(consultations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConsultation,
  deleteConsultation,
  updateConsultation,
  singleConsultation,
  getAllConsultations,
};