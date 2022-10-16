const hospitalDao = require('../models/hospitalDao');

const getAvailableHospitals = async (limit, offset) => {
  const total = await hospitalDao.getAvailableHospitalCount();
  const pages = { total: total[0]['total'], limit, offset };
  const data = await hospitalDao.getAvailableHospitals(limit, offset);
  const result = { pages: pages, data: data };
  return result;
};

const getAvailableTime = async (hospitalId) => {
  const availableTimes = await hospitalDao.getAvailableTime(hospitalId);
  const hospitalName = await hospitalDao.getHospitalName(hospitalId);
  const result = {
    id: hospitalId,
    name: hospitalName[0]['name'],
    availableTimes: availableTimes[0]['available_times'],
  };
  return result;
};

module.exports = { getAvailableHospitals, getAvailableTime };
