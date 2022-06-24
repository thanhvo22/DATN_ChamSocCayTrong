const playlistModel = require("../models/playlists.model");
const userModel = require("../models/user.model");
const videoModel = require("../models/video.model");

const statisticController = {
  all: async (req, res) => {
    try {
      const listAll = await playlistModel.find().count();
      const listAccept = await playlistModel.find({ status: "Accept" }).count();
      const listRefuse = await playlistModel.find({ status: "Refuse" }).count();
      const user = await userModel.find({ typeofUser: "User" }).count();
      const sharers = await userModel.find({ typeofUser: "Sharers" }).count();

      res.json({
        message: `Statistic: `,
        listAll,
        listAccept,
        listRefuse,
        user,
        sharers,
      });
    } catch (error) {
      res.json({ error });
    }
  },
};

module.exports = statisticController;
