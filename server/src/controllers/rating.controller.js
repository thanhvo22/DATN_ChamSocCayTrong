const rateModel = require("../models/rating.model");
const playListModel = require("../models/playlists.model");

module.exports.getRates = async (req, res) => {
  const rates = await rateModel.find();
  res.json(rates);
};

module.exports.getRateForPlayList = async (req, res) => {
  const playlist_ID = req.signedCookies.playlist_id;
  const rateForPlaylist = await rateModel.findOne({ id: playlist_ID });
  res.json(rateForPlaylist);
};

module.exports.getRateForUser = async (req, res) => {
  const userId = req.signedCookies.cookie_id;
  const rateForUser = await rateModel.find({ userId });
  res.json(rateForUser);
};

async function updateRating(playlistId) {
  const list_Rating = await rateModel.find({ playlistId: playlistId });
  const _rating = list_Rating.reduce((start, end) => {
    return start + end.rating;
  }, 0);
  const total_rating = _rating / list_Rating.length;
  console.log(`total_rating: ${total_rating}`);
  await playListModel.findOneAndUpdate(
    { _id: playlistId },
    {
      rating: total_rating.toFixed(2),
    }
  );
}

module.exports.postCreateRate = async (req, res) => {
  try {
    
    const { rating,playlistId ,userId} = req.body;
    //check if the user has rated it
    const checkRate = await rateModel.findOne({
      userId,
      playlistId,
    });
    if (!checkRate) {
      const rate = await rateModel.create({
        playlistId,
        userId,
        rating,
      });
      //update rating for playlist
      await updateRating(playlistId);
      res.json({
        message: "create rate successfully",
        rate
      });
    }
    //update rating
    const rate = await rateModel.findOneAndUpdate(
      {
        playlistId,
        userId,
      },
      {rating}
    );
    await updateRating(playlistId);
    res.json({
      message:`update rating successfully`,
      rate
    })
  } catch (error) {
    res.json({ error });
  }
};

module.exports.deleteRating = async (req, res) => {
  const id = req.params.id;
  const playlist_ID = req.signedCookies.playlist_id;
  await rateModel.findByIdAndDelete(id);
  updateRating(playlist_ID);
  res.json({
    message: "Rating deleted successfully",
  });
};
