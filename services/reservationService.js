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

const updateReservationStatus = async (reservation_id, status) => {
  //존재하는 예약번호인지 확인
  const seletedReservation = await reservationDao.readReservationById(reservation_id);

  if (seletedReservation.length == 0) {
    const error = new Error('reservation_id does not exist.');
    error.statusCode = 404;
    throw error;
  }

  //status = 4(노쇼) 인 경우 -> 예약 status, 환자 is_blocked 둘 다 업데이트
  if (status == 4) {
    //이미 차단된 환자인지 확인
    const seletedPatient = await reservationDao.readPatientById(seletedReservation[0].patient_id);

    if (seletedPatient[0].is_blocked == 1) {
      const error = new Error('already blocked patient.');
      error.statusCode = 409;
      throw error;
    }
    //환자 is bloked 변경
    await reservationDao.updatePatientIsBlocked(seletedReservation[0].patient_id);
  }

  //예약 상태 변경
  await reservationDao.updateReservationStatus(status, reservation_id);
};

module.exports = { createReservation, updateReservationStatus };
