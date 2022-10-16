const { body } = require('express-validator');
const validationResultChecker = require('./index');
const errorCodes = require('../codes/errorCodes');

function reservationValidator() {
  return [
    body('user_name')
      .trim()
      .notEmpty()
      .withMessage('user_name is ' + `${errorCodes.REQUIRED}`)
      .isLength({ max: 15 })
      .withMessage('name can be up to ' + `${errorCodes.MAXLENGTH(15)}`),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is ' + `${errorCodes.REQUIRED}`)
      .isEmail()
      .withMessage('email is ' + `${errorCodes.WRONGFORMAT}`)
      .normalizeEmail(),
    body('phone_number')
      .trim()
      .notEmpty()
      .withMessage('phone_number is ' + `${errorCodes.REQUIRED}`)
      .isMobilePhone()
      .withMessage('phone_number is ' + `${errorCodes.WRONGFORMAT}`),
    body('hospital_id')
      .trim()
      .notEmpty()
      .withMessage('hospital_id is ' + `${errorCodes.REQUIRED}`)
      .isNumeric()
      .withMessage('hospital_id ' + `${errorCodes.NUMBERFORMAT}`),
    body('time_window_id')
      .trim()
      .notEmpty()
      .withMessage('time_window_id is ' + `${errorCodes.REQUIRED}`)
      .isNumeric()
      .withMessage('time_window_id ' + `${errorCodes.NUMBERFORMAT}`),
    validationResultChecker,
  ];
}

module.exports = { reservationValidator };
