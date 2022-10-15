const hospitalDao = require('../models/hospitalDao');

const getAvailableHospitals = async () => {
  return await hospitalDao.getAvailableHospitals();
};

const getAvailableTime = async (hospitalId) => {
  return await hospitalDao.getAvailableTime(hospitalId);
};

module.exports = { getAvailableHospitals, getAvailableTime };
