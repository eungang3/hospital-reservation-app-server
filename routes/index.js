var express = require('express');
const reservationRouter = require('./reservationRouter');
var router = express.Router();

router.use('/reservations', reservationRouter);

module.exports = router;
