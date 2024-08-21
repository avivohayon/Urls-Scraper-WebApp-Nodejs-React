const express = require('express');
const cors = require('cors');
const scrapeRoutes = require('./routes/scrapeRoutes');
const corsOptions = require('../config/corsOptions');
const rateLimit = require('express-rate-limit');
const cookieParser = require("cookie-parser")
const csrf = require('csurf'); // Add this line

const app = express();

const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // Limit each IP to 5 requests per windowMs
    message: '429 status code \n Too many requests from this IP, please try again later.',
    handler: (req, res, next) => {
        console.log('Rate limit exceeded');
        res.status(429).send('429 status code \n Too many requests from this IP, please try again later.');
    }
});

app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())


// CSRF protection middleware configuration
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection); 

app.use('/api', scrapeRoutes);


module.exports = app;
