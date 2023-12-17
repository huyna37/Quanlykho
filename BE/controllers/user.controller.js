const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const Service = require('../services/user.service');

exports.getAll = async (req, res) => {
  try {
    let result = [];
    result = await Service.getAll(req, res);
    res.status(200).json({
      status: true,
      result
    });
  } catch (error) {
    console.error("Error crawling data:", error);
    res.status(500).json({
      status: false,
      error: "Internal server error"
    });
  }
};

exports.create = async (req, res) => {
  try {
    await Service.create(req.body, res);
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.error("Error crawling data:", error);
    res.status(500).json({
      status: false,
    });
  }
};

exports.update = async (req, res) => {
  try {
    await Service.update(req.params.id, req.body);
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.error("Error crawling data:", error);
    res.status(500).json({
      status: false,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Service.remove(req);
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.error("Error crawling data:", error);
    res.status(500).json({
      status: false,
    });
  }
};
