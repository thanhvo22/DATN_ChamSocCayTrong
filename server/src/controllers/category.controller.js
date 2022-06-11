const Category = require("../models/category.model");

module.exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json({
      success: "alls",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

module.exports.getCategoryID = async (req, res) => {
  let id = req.params.id;
  const category = await Category.findById(id);
  res.json({
    success: true,
    data: category,
  });
};

module.exports.postCreateCategory = async function (req, res) {
  const {name, userId} = req.body;
  let category = await Category.create({name, userId});
  res.json(category);
};

module.exports.putCategory = async (req, res) => {
  try { 
    const id = req.params.id;
    const {name} = req.body;
    const category = await Category.findByIdAndUpdate(id, {name});
    res.json(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};
