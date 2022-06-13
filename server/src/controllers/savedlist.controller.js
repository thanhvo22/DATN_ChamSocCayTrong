const savedListModel = require("../models/savedList.model");

const savedListController = {
  getAllSavedLists: async (req, res) => {
    try {
      const savedLists = await savedListModel.find();
      res.json({ message: `Savedlists: `, savedLists });
    } catch (error) {
      res.json({ error });
    }
  },
  
  getAllSavedListsForUser: async (req,res) => {
    const userId = req.signedCookies.cookie_id;
    try {
      const allSavedLists = await savedListModel.find({userId}).populate(["userId","playlistId"]);
      res.json(allSavedLists);
    } catch (error) {
      res.json({ error });
    }
  },

  getSavedListByUser: async (req, res) => {
    try {
      const {userId} = req.body
      const savedList = await savedListModel.find({ userId: userId }).populate(["userId","playlistId"]);
      res.json({ message: `SavedList for User: `, savedList });
    } catch (error) {
      res.json({ error });
    }
  },

  createSavedListByUser: async (req, res) => {
    try {
      
      const {userId, playlistId} = req.body;
      const savedList = await savedListModel.create({
        userId,
        playlistId,
      });
      res.json({
        message: `savedList created successfully`,
        savedList,
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },

  deleteSavedListByUser: async (req, res) => {
    const id = req.params.id;
    await savedListModel.findByIdAndRemove(id);
    res.json({
      message: "delete saved list successfully",
    });
  },
};

module.exports =  savedListController;