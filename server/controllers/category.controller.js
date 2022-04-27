import categoryModel from "../models/category.model";

export const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(400).json({ success: false });
      console.log(error);
    }
  },

  getCategoryID: async (req, res) => {
    let id = req.params.id;
    const category = await Category.findById(id).exec();
    res.json({
      success: true,
      data: category,
    });
  },

  postCreateCategory: async function (req, res) {
    let category = await Category.create(req.body);
    res.json(category);
  },

  putCategory: async (req, res) => {
    try {
      let updateCategory = await Category.findById(req.params.id).exec();
      updateCategory.set(req.body);
      let result = await updateCategory.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  deleteCategory: async (req, res) => {
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
  },
};
