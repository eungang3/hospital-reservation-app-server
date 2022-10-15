const reservationDao = require('../models/reservationDao');
const { v4 } = require('uuid');

const createReservation = async (body) => {
  const { type, user_name, phone_number, email, hospital_id, time_window_id } = body;
  let patient_id;
  let reservation_number = v4();

  // 이미 예약된 시간인지 확인
  const seletedReservation = await reservationDao.readReservation(hospital_id, time_window_id);
  if (seletedReservation.length > 0) {
    const error = new Error('already reserved time');
    error.statusCode = 409;
    throw error;
  }

  //patients 테이블에 등록되어있는 환자인지 확인
  const seletedPatient = await reservationDao.readPatientIdByPhoneNumber(phone_number);

  if (seletedPatient.length > 0) {
    //등록된 환자인 경우
    patient_id = seletedPatient[0].id;
  } else {
    //등록되지 않은 환자인 경우
    const createdPatient = await reservationDao.createPatient(user_name, phone_number, email);
    patient_id = createdPatient.insertId;
  }

  //예약 등록
  const createdReservation = await reservationDao.createReservation(
    type,
    reservation_number,
    patient_id,
    hospital_id,
    time_window_id
  );
};

module.exports = { createReservation };
