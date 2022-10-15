const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

router.get('', hospitalController.getAvailableHospitals);
router.get('/:hospitalId', hospitalController.getAvailableTime);
module.exports = router;
