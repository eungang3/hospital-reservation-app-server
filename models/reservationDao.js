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

const getFullListByReservationNumber = 
  async (reservation_number) => {
    const [list] = await myDataSource.query(
      ` SELECT * FROM reservations WHERE reservation_number = ?`,[reservation_number] 
      )
      
    return list
}

const getFullListByPatientName =
  async (patient_name) => {
    const [list] = await myDataSource.query(
      ` SELECT * FROM reservations JOIN patients 
        ON reservations.patient_id = patients.id WHERE name = ?`,[patient_name]
      );
     
    return list
    
  }
/**
 * 기능: patients 테이블 is_blocked 컬럼 업데이트
 */
 const updatePatientIsBlocked = async (patient_id) => {
  try {
    await myDataSource.query(
      `
      UPDATE patients 
      SET is_blocked = 1
      WHERE id = ?
      `,
      [patient_id]
    );
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

/**
 * 기능: reservations 테이블 status 컬럼 업데이트
 */
const updateReservationStatus = async (status, reservation_id) => {
  try {
    await myDataSource.query(
      `
      UPDATE reservations
      SET status = ?
      WHERE id = ?
      `,
      [status, reservation_id]
    );
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

/**
 * 기능: reservation id로 예약 정보 조회
 */
const readReservationById = async (id) => {
  try {
    const seletedReservation = await myDataSource.query(
      `
      SELECT *
      FROM reservations
      WHERE id = ?
    `,
      [id]
    );
    return seletedReservation;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

/**
 * 기능: patient id로 환자 정보 조회
 */
const readPatientById = async (patient_id) => {
  try {
    const seletedPatient = await myDataSource.query(
      `
      SELECT *
      FROM patients
      WHERE id = ?
    `,
      [patient_id]
    );
    return seletedPatient;
  } catch (err) {
    const error = new Error(err.message);
    error.statusCode = 500;
    throw error;
  }
};

const findReservationInfo = async(reservation_number) => {
  const [result] = await myDataSource.query(
      `
      SELECT p.name, r.type, t.start_time, t.id as time_window_id, p.id as patient_id, r.id as reservation_id
      FROM reservations as r
      INNER JOIN patients as p ON r.patient_id = p.id
      INNER JOIN time_windows as t ON r.time_window_id = t.id
      WHERE reservation_number = ${reservation_number}
      `
  );
  return result;
};

const updateName = async(reservationDao) => {
  await myDataSource.query(
      `
      UPDATE patients
      SET name = "${reservationDao.name}"
      WHERE id = "${reservationDao.originInfo.patient_id}"
      `
  );
};

const updateTime = async(reservationDao) => {
  await myDataSource.query(
      `
      UPDATE reservations
      SET time_window_id = ${reservationDao.time_window_id}
      WHERE id = "${reservationDao.originInfo.reservation_id}"
      `
  );
};

const updateType = async(reservationDao) => {
  await myDataSource.query(
      `
      UPDATE reservations
      SET type = "${reservationDao.type}"
      WHERE id = "${reservationDao.originInfo.reservation_id}"
      `
  );
};

module.exports = {
  readReservation,
  readPatientIdByPhoneNumber,
  createPatient,
  createReservation,
  getFullListByReservationNumber,
  getFullListByPatientName,
  updatePatientIsBlocked,
  updateReservationStatus,
  readPatientById,
  readReservationById,
  findReservationInfo,
  updateName,
  updateTime,
  updateType,
};
