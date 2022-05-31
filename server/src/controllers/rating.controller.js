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
  const userID = req.signedCookies.cookie_id;
  const rateForUser = await rateModel.find({ userID });
  res.json(rateForUser);
};

async function updateRating(playlist_ID) {
  const list_Rating = await rateModel.find({ playListRating: playlist_ID });
  const _rating = list_Rating.reduce((start, end) => {
    return start + end.rating;
  }, 0);
  const total_rating = _rating / list_Rating.length;
  console.log(`total_rating: ${total_rating}`);
  await playListModel.findOneAndUpdate(
    { _id: playlist_ID },
    {
      rating: total_rating.toFixed(2),
    }
  );
}

module.exports.postCreateRate = async (req, res) => {
  try {
    const playlist_ID = req.signedCookies.playlist_id;
    const userID = req.signedCookies.cookie_id;
    const { rating } = req.body;
    //check if the user has rated it
    const checkRate = await rateModel.findOne({
      userID,
      playlist_ID,
    });
    console.log(`check rate: ${checkRate}`);
    if (!checkRate) {
      const rate = await rateModel.create({
        playListRating: playlist_ID,
        userID,
        rating,
      });
      console.log(`rate: ${rate}`);
      //update rating for playlist
      updateRating(playlist_ID);
      res.json({
        message: "create rate successfully",
        rate
      });
    }
    //update rating
    const rate = await rateModel.findOneAndUpdate(
      {
        playListRating: playlist_ID,
        userID,
      },
      {rating}
    );
    updateRating(playlist_ID);
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
