const myDataSource = require('./db.config');

const getAvailableHospitals = async () => {
  try {
    const hospitals = await myDataSource.query(
      `
      SELECT 
        hospital_time_windows.hospital_id, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                "start_time", time_windows.start_time 
            )
        ) as available_times,
        hospitals.name
      FROM hospital_time_windows
      JOIN time_windows ON time_windows.id = hospital_time_windows.time_window_id
      JOIN hospitals ON hospital_time_windows.hospital_id = hospitals.id
      WHERE (hospital_id, time_window_id) NOT IN(
        SELECT reservations.hospital_id, reservations.time_window_id
        FROM hospital_time_windows 
        JOIN reservations 
        ON reservations.hospital_id = hospital_time_windows.hospital_id 
        AND reservations.time_window_id = hospital_time_windows.time_window_id)
       GROUP BY hospital_time_windows.hospital_id;
    `
    );
    return hospitals;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

const getAvailableTime = async (hospitalId) => {
  try {
    const availableTimes = await myDataSource.query(
      `
      SELECT 
      JSON_ARRAYAGG(time_windows.start_time) as available_times
      FROM hospital_time_windows 
      JOIN time_windows ON time_windows.id = hospital_time_windows.time_window_id
      WHERE time_window_id NOT IN 
      (SELECT time_window_id FROM reservations WHERE hospital_id = ?)
      AND hospital_id = ?;
        `,
      [hospitalId, hospitalId]
    );
    return availableTimes;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { getAvailableHospitals, getAvailableTime };
