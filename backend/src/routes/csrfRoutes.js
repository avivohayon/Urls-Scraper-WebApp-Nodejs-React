const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get('/csrf-token', csrfProtection, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
  res.json({ message: 'CSRF token sent' });
});

module.exports = router;
