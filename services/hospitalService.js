const hospitalDao = require('../models/hospitalDao');

const getAvailableHospitals = async (limit, offset) => {
  const total = await hospitalDao.getAvailableHospitalCount();
  const pages = { total: total[0]['total'], limit, offset };
  const data = await hospitalDao.getAvailableHospitals(limit, offset);
  const result = { pages: pages, data: data };
  return result;
};

const getAvailableTime = async (hospitalId) => {
  return await hospitalDao.getAvailableTime(hospitalId);
};

module.exports = { getAvailableHospitals, getAvailableTime };
