const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();
const { reservationValidator } = require('../validator/reservationValidator');

router.get('/patient', reservationController.allReservationCheckByName);
router.get('', reservationController.allReservationCheckByReservationNumber);
router.post('/', reservationValidator(), reservationController.createReservation);
router.patch('/:id/status', reservationController.updateReservationStatus);
router.patch('/info', reservationController.updateReservationController);

module.exports = router;
