const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.post('/', reservationController.createReservation);
router.patch('/:id', reservationController.updateReservationStatus);
router.patch('/update/info', reservationController.updateReservationController);

module.exports = router;
