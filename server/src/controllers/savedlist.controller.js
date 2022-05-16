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

  getSavedListByUser: async (req, res) => {
    try {
      const user_id = req.signedCookies.cookie_id;
      const savedList = await savedListModel.findOne({ userID: user_id });
      res.json({message: `SavedList for User: `,savedList});
    } catch (error) {
      res.json({ error });
    }
  },

  createSavedListByUser: async (req, res) => {
    try {
      const userID = req.signedCookies.cookie_id;
      const playlistID = req.signedCookies.playlist_id;
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
