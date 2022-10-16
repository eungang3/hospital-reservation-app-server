const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
  await reservationService.createReservation(req.body);
  res.status(201).json({ message: 'reservation success' });
};

const updateReservationStatus = async (req, res) => {
  await reservationService.updateReservationStatus(req.params.id, req.body.status);
  res.status(201).json({ message: 'reservation update success' });
};

module.exports = { createReservation, updateReservationStatus };
