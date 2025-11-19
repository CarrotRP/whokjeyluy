const express = require('express');
const loanController = require('../controllers/loanController');

const authenticateToken = require('../functions/authenticateToken');

const router = express.Router();

router.post('/add', authenticateToken, loanController.add_loan);
router.patch('/update/:id', authenticateToken, loanController.update_loan);
router.delete('/delete/:id', authenticateToken, loanController.delete_loan);
router.get('/', authenticateToken, loanController.get_loan_list);
router.get('/summary', authenticateToken, loanController.get_summary);
router.get('/:id', authenticateToken, loanController.get_one_loan);

module.exports = router;