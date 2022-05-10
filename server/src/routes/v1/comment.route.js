const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/comment.controller");

router.get('/', commentController.getComments);
router.post('/create', commentController.postCreateCmt);
router.put('/edit/:id', commentController.putCmt);
router.delete('/delete/:id', commentController.deleteCmt);

module.exports = router