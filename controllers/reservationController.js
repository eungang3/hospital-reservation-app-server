const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
  await reservationService.createReservation(req.body);
  res.status(201).json({ message: 'reservation success' });
};

module.exports = { createReservation };
