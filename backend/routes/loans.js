const express = require('express');
const loanController = require('../controllers/loanController');

const authenticateToken = require('../functions/authenticateToken');

const router = express.Router();

router.post('/add', authenticateToken, loanController.add_loan);
router.get('/', authenticateToken, loanController.get_loan_list);
router.get('/summary', authenticateToken, loanController.get_summary);

module.exports = router;