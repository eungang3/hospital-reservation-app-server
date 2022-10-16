const hospitalService = require('../services/hospitalService');

// 예약 가능한 모든 병원 목록 확인
const getAvailableHospitals = async (req, res) => {
  let { limit, offset } = req.query;
  if (!limit) {
    limit = 20;
  }
  if (!offset) {
    offset = 0;
  }
  const hospitals = await hospitalService.getAvailableHospitals(limit, offset);
  res.status(200).json({ message: hospitals });
};

// 특정 병원의 예약 가능 일시 확인
const getAvailableTime = async (req, res) => {
  const hospitalId = parseInt(req.params.hospitalId);
  const availableTimes = await hospitalService.getAvailableTime(hospitalId);
  res.status(200).json({ message: availableTimes });
};

module.exports = { getAvailableHospitals, getAvailableTime };
