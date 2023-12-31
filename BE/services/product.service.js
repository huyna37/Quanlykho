const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const Paginate = require("./paginate.service");

const create = async (req) => {
  return await Product.create(req);
};

const update = async (id, body) => {
  await Product.findByIdAndUpdate(id, body);
  return true;
};

const remove = async (req) => {
  const manga = await Product.findById(req.params.id);
  if (!manga) {
    return false;
  }
  await Product.deleteOne(manga);
  return true;
};

const getAll = async (req) => {
  const populateOptions = [
    { path: 'category', select: '' },
    { path: 'supplier', select: '' },
  ];
  req.query.populateOptions = populateOptions;
  const data = await Paginate(
    req.query.page,
    req.query.limit,
    Product,
    req
  );
  return data;
};
const getBySlug = async (req) => {
  const result = await Product.findOne({ slug: req.param });
  if (!result) {
    return false;
  }
  return result;
};

module.exports = { create, update, remove, getAll, getBySlug };