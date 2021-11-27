const express = require('express');
const bookingRouter = express.Router();
const path = require("path");
const { protectRoute } = require('../Controllers/authController');
const { createSession } = require('../Controllers/bookingController');

bookingRouter.post('/createSession', protectRoute);
bookingRouter.get('/createSession', function(req, res) {

    res.sendFile('index.html', { root: __dirname });
});

module.exports = bookingRouter;