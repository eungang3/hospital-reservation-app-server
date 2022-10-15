var express = require('express');
const reservationRouter = require('./reservationRouter');
const hospitalRouter = require('./hospitalRouter');
var router = express.Router();

router.use('/reservations', reservationRouter);
router.use('/hospitals', hospitalRouter);

module.exports = router;
