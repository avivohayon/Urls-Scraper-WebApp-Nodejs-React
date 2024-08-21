const scrapeService = require('../services/scrapeService');
const errorHandler = require('../utils/errorHandler');
const sanitizeHtml = require('sanitize-html');

exports.scrapeUrls = async (req, res) => {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request: Please provide an array of valid URLs to scrape."
        });
    }

    // Sanitize each URL to prevent XSS attacks
    const sanitizedUrls = urls.map(url => sanitizeHtml(url));

    try {
        const data = await scrapeService.scrapeMetatags(sanitizedUrls);
        if (data.some(item => item.error)) {
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error: An error occurred during scraping."
            });
        }
        res.status(200).json(data);
    } catch (error) {
        errorHandler(res, error);
    }
};
