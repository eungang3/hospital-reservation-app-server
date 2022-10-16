const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
  await reservationService.createReservation(req.body);
  res.status(201).json({ message: 'reservation success' });
};

const updateReservationStatus = async (req, res) => {
  await reservationService.updateReservationStatus(req.params.id, req.body.status);
  res.status(201).json({ message: 'reservation update success' });
};

const updateReservationController = async (req, res) => {
  try{
      const reservationDto = {...req.body};
      
      if(!reservationDto.reservation_number){
          const error = new Error('reservation_number error');
          error.statusCode = 400;
          throw error;
      }

      if(!reservationDto.name && !reservationDto.time_window_id && !reservationDto.type){
          const error = new Error('choose the name, time_window_id, type');
          error.statusCode = 400;
          throw error;
      }

      const result = await reservationService.updateReservationService(reservationDto);
      
      return res.status(200).json({message: "reservation is changed", result: result});
  }
  catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { createReservation, updateReservationStatus, updateReservationController };
