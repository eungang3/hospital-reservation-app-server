const express = require('express');
const reservationController = require('../controllers/reservationController');
const errorHandler = require("../middlewares/errorHandler")

const router = express.Router();

router.post('/', reservationController.createReservation);
router.get('/patient', reservationController.allReservationCheckByName);
router.get('', reservationController.allReservationCheckByReservationNumber);

module.exports = router;
