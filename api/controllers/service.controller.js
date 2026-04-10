const Service = require("../models/service.models.js");
const { throwError } = require("../utils/error.js");

//===== Create Service =====//
const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

//====== Handle Delete ========//
const deleteService = async (req, res, next) => {
  try {
    const isServiceExist = await Service.findById(req.params.id);
    if (!isServiceExist) return next(throwError(404, "Service not found"));

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json("Service deleted successfully");
  } catch (error) {
    next(error);
  }
};

//===== Handle Service Update ======//
const updateService = async (req, res, next) => {
  try {
    const isServiceExist = await Service.findById(req.params.id);
    if (!isServiceExist) return next(throwError(404, "Service not found"));

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};

//===== Get A Single Service ====//
const singleService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return next(throwError(404, "Service not found"));

    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

//==== Get All Services ====//
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createService,
  deleteService,
  updateService,
  singleService,
  getAllServices,
};