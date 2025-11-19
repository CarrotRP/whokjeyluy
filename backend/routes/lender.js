const express = require('express');
const lenderController = require('../controllers/lenderController');
const authenticateToken = require('../functions/authenticateToken')

const router = express.Router();

router.post('/login', lenderController.lender_login);
router.post('/signup', lenderController.lender_signup);
router.patch('/user', authenticateToken, lenderController.lender_update);
router.post('/logout', lenderController.lender_logout);
router.get('/check-auth', lenderController.check_auth);

module.exports = router;