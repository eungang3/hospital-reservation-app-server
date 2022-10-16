const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();
const { reservationValidator } = require('../validator/reservationValidator');

router.post('/', reservationValidator(), reservationController.createReservation);
router.patch('/:id', reservationController.updateReservationStatus);

module.exports = router;
