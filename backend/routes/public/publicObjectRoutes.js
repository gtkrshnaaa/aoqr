// routes/publicObjectRoutes.js
const express = require('express');
const publicObjectController = require('../../controllers/public/publicObjectController');
const publicTranslateController = require('../../controllers/public/publicTranslateController');


const router = express.Router();

// Route untuk mendapatkan semua objek
router.get('/objects/get-all', publicObjectController.getAllPublicObjects);

// Route untuk mendapatkan objek berdasarkan ID
router.get('/objects/get-by-id/:id', publicObjectController.getPublicObjectById);

// Route untuk translate text
router.post('/objects/translate', publicTranslateController.translateText);

module.exports = router;
