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
  let category = await Category.create(req.body);
  res.json(category);
};

module.exports.putCategory = async (req, res) => {
  try {
    let updateCategory = await Category.findById(req.params.id);
    updateCategory.set(req.body);
    let result = await updateCategory.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete({ _id: req.params.id });
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};
