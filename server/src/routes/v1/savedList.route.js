const express = require("express");
const router = express.Router();
const savedListController = require("../../controllers/savedlist.controller");

router.get('/', savedListController.getAllSavedLists);
router.get('/all', savedListController.getAllSavedListsForUser)
router.get('/for-you', savedListController.getSavedListByUser);
router.post('/create', savedListController.createSavedListByUser);
router.delete('/delete/:id', savedListController.deleteSavedListByUser);

module.exports = router;