const express = require('express');
const router = express.Router();

const attendanceController = require('../controllers/attendanceController');

//[POST] check in
router.post('/check-in', attendanceController.startWorking);

//[POST] check out
router.post('/check-out', attendanceController.endWorking);

//[POST] Register on leave
router.post('/on-leave', attendanceController.onLeave);

//[GET] infomation of attendance and list of leave
router.get('/', attendanceController.index);

module.exports = router;
