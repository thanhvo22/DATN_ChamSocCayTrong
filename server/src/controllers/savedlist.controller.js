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
    const userID = req.signedCookies.cookie_id;
    try {
      const allSavedLists = await savedListModel.find({userID}).populate(["userID","playlistID"]);
      res.json(allSavedLists);
    } catch (error) {
      res.json({ error });
    }
  },

  getSavedListByUser: async (req, res) => {
    try {
      const user_id = req.signedCookies.cookie_id;
      const savedList = await savedListModel.findOne({ userID: user_id }).populate(["userID","playlistID"]);
      res.json({ message: `SavedList for User: `, savedList });
    } catch (error) {
      res.json({ error });
    }
  },

  createSavedListByUser: async (req, res) => {
    try {
      const playlistID = req.params.id;
      const userID = req.signedCookies.cookie_id;
      
      const savedList = await savedListModel.create({
        userID,
        playlistID,
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
    await savedListModel.delete(id);
    res.json({
      message: "delete saved list successfully",
    });
  },
};

module.exports =  savedListController;