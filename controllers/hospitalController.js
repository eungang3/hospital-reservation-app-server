const hospitalService = require('../services/hospitalService');

// 예약 가능한 모든 병원 목록 확인
const getAvailableHospitals = async (req, res) => {
  const hospitals = await hospitalService.getAvailableHospitals();
  res.status(200).json({ message: hospitals });
};

// 특정 병원의 예약 가능 일시 확인
const getAvailableTime = async (req, res) => {
  const hospitalId = req.params.hospitalId;
  const availableTimes = await hospitalService.getAvailableTime(hospitalId);
  res.status(200).json({ message: availableTimes });
};

module.exports = { getAvailableHospitals, getAvailableTime };
