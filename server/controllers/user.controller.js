import userModel from "../models/user.model";

export const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({ success: false });
      console.log(error);
    }
  },

  getUserID: async (req, res) => {
    let id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.json({
      success: true,
      data: user,
    });
  },

  postCreateUser: async function (req, res) {
    let user = await User.create(req.body);
    res.json(user);
  },

  putUser: async (req, res) => {
    try {
      let updateUser = await User.findById(req.params.id).exec();
      updateCustomer.set(req.body);
      let result = await updateUser.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  deleteUserID: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.id });
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({ success: false });
      console.log(error);
    }
  },
};
