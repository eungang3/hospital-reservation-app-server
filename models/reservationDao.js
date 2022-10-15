const myDataSource = require('./db.config');

/**
 * 기능: hospital_id, time_window_id 조합으로 예약 정보 조회
 */
const readReservation = async (hospitalId, timeWindowId) => {
  try {
    const seletedReservation = await myDataSource.query(
      `
      SELECT *
      FROM reservations
      WHERE hospital_id = ? AND time_window_id = ?
    `,
      [hospitalId, timeWindowId]
    );
    return seletedReservation;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

/**
 * 기능: phone_number로 patient 조회
 */
const readPatientIdByPhoneNumber = async (phone_number) => {
  try {
    const seletedPatient = await myDataSource.query(
      `
      SELECT id
      FROM patients
      WHERE phone_number = ?
    `,
      [phone_number]
    );
    return seletedPatient;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

/**
 * 기능: 환자 정보 등록
 */
const createPatient = async (user_name, phone_number, email) => {
  try {
    const createdPatient = await myDataSource.query(
      `
      INSERT INTO patients (name, phone_number, email)
      VALUES(?, ?, ?)
      `,
      [user_name, phone_number, email]
    );
    return createdPatient;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

/**
 * 기능: 예약 정보 등록
 */
const createReservation = async (
  type,
  reservation_number,
  patient_id,
  hospital_id,
  time_window_id
) => {
  try {
    const createdReservation = await myDataSource.query(
      `
      INSERT INTO reservations (type, reservation_number, patient_id, hospital_id, time_window_id)
      VALUES(?, ?, ?, ?, ?)
      `,
      [type, reservation_number, patient_id, hospital_id, time_window_id]
    );
    return createdReservation;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { readReservation, readPatientIdByPhoneNumber, createPatient, createReservation };
