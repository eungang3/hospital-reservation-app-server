const express = require('express');
const reservationController = require('../controllers/reservationController');
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router();
const { reservationValidator } = require('../validator/reservationValidator');

router.post('/', reservationController.createReservation);
router.get('/patient', reservationController.allReservationCheckByName);
router.get('', reservationController.allReservationCheckByReservationNumber);
router.post('/', reservationValidator(), reservationController.createReservation);
router.patch('/:id', reservationController.updateReservationStatus);
router.patch('/update/info', reservationController.updateReservationController);

module.exports = router;
