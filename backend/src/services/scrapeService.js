const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeMetatags = async (urls) => {
    const requests = urls.map(async (url) => {
        try {
            const res = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const html = res.data;
            const $ = cheerio.load(html);

            const getMetatag = (name) => {
                const metaContent =
                    $(`meta[property="og:${name}"]`).attr('content') ||
                    $(`meta[name="${name}"]`).attr('content') ||
                    $(`meta[name="twitter:${name}"]`).attr('content');

                return metaContent;
            };

            return {
                url,
                title: $('title').first().text(),
                favicon: $('link[rel="shortcut icon"]').attr('href'),
                description: getMetatag('description'),
                image: getMetatag('image') || getMetatag('og:image'),
                author: getMetatag('author'),
            };
        } catch (error) {
            return { url, error: "Failed to fetch metadata", status: 500 };
        }
    });

    return Promise.all(requests);
};
