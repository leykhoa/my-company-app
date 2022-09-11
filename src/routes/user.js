const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/edit-image', userController.postImage);
router.patch('/update', userController.update);
router.get('/all-members', userController.allMembers);
router.get('/', userController.index);

module.exports = router;
