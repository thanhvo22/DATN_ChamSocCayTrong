const commentModel = require("../models/comment.model");

module.exports.getComments = async (req, res) => {
    const comments = await commentModel.find();
    res.json(comments);
}

module.exports.postCreateCmt = async(req,res)=> {
    const userID = req.singedCookie.user_id;
    const playlistID = req.params.playlistID;
    const {comment} = req.body;
    const newComment= await commentModel.create({
        userID,
        playlistID,
        comment
    })

    res.json(newComment);
}