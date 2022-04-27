import playlistModel from "../models/playlist.model";

export const playlistController = {
  getAllPlayList: async (req, res) => {
    try {
      const playLists = await playlistModel.find();
      return res.json({
        message: "get All play list",
        playLists,
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
  getPlayListID: async (req, res) => {
    try {
      const id = req.params.id;
      const playList = await playlistModel.findById(id);
      return res.json({
        message: "get play list",
        playList,
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
  postCreatePlayList: async (req, res) => {
    try {
      const userID = req.signedCookies.cookie_id;
      const { playlistName, preview } = req.body;
      const playlist = await playlistModel.create({
        userID,
        playlistName,
        preview,
      });
      return res.json({
        message: "create playlist successfully",
        playlist,
      });
    } catch (error) {
        res.json({
            message: error
        })
    }
  },
  putPlayList: async (req, res) => {
      try {
          const id = req.params.id;
          const {playlistName, preview} = req.body;
          const playlist = await playlistModel.findByIdAndUpdate(id,{
              playlistName,
              preview
          });
          return res.json({
              message: "edit play list successfully",
              playlist
          })
      } catch (error) {
          res.json({
              message: error
          })
      }
  },
  deletePlayList: async(req, res) => {
      const id = req.params.id;
      await playlistModel.findByIdAndRemove(id);
      return res.json({
          message: "delete playlist success fully"
      })
  },
};
