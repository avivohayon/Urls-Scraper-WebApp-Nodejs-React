const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

router.post('/scrape', scrapeController.scrapeUrls);

module.exports = router;
