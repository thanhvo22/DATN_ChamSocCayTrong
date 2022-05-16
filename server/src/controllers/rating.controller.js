const rateModel = require("../models/rating.model");

module.exports.getRates = async (req, res) => {
  const rates = await rateModel.find();
  res.json(rates);
};

module.exports.getRateForPlayList = async (req, res) => {
  const playlist_ID = req.signedCookies.playlist_id;
  const rateForPlaylist = await rateModel.findOne({ id: playlist_ID });
  res.json(rateForPlaylist);
};

module.exports.postCreateRate = async (req, res) => {
  try {
    const playlist_ID = req.signedCookies.playlist_id;
    const userID = req.signedCookies.cookie_id;
    const { rating } = req.body;
    const rate = rateModel.create({
      playlist_ID,
      userID,
      rating,
    });
    res.json({
      message: "create rate successfully",
      rate,
    });
  } catch (error) {
    res.json({ error });
  }
};
