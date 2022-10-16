const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
  await reservationService.createReservation(req.body);
  res.status(201).json({ message: 'reservation success' });
};

const allReservationCheckByName = async(req, res) => {
  const { patient_name } = req.query;
  const result = await reservationService.allReservationCheckByName(patient_name);
  
  return res.status(200).json({result : result, message : "success_get_reservation"});
};

const allReservationCheckByReservationNumber = async(req, res) => {
  const { reservation_number } = req.query;
  const result = await reservationService.allReservationCheckByReservationNumber(reservation_number);

  return res.status(200).json({result : result, message : "success_get_reservation"})
}
const updateReservationStatus = async (req, res) => {
  await reservationService.updateReservationStatus(req.params.id, req.body.status);
  res.status(201).json({ message: 'reservation update success' });
};

module.exports = { 
  createReservation,
  allReservationCheckByName,
  allReservationCheckByReservationNumber,
  updateReservationStatus
};
