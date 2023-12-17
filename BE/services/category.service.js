const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');
const Paginate = require("./paginate.service");

const create = async (req) => {
  return await Category.create(req);
};

const update = async (id, body) => {
  await Category.findByIdAndUpdate(id, body);
  return true;
};

const remove = async (req) => {
  const manga = await Category.findById(req.params.id);
  if (!manga) {
    return false;
  }
  await Category.deleteOne(manga);
  return true;
};

const getAll = async (req) => {
  const data = await Paginate(
    req.query.page,
    req.query.limit,
    Category,
    req
  );
  return data;
};

const getBySlug = async (req) => {
  const result = await Category.findOne({ slug: req.param });
  if (!result) {
    return false;
  }
  return result;
};

module.exports = { create, update, remove, getAll, getBySlug };