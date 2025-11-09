const express = require('express');
const jwt = require('jsonwebtoken');
const lenderController = require('../controllers/lenderController');

const router = express.Router();


router.post('/login', lenderController.lender_login);
router.post('/signup', lenderController.lender_signup);
router.post('/logout', lenderController.lender_logout);
router.get('/check-auth', lenderController.check_auth);
router.get('/', authenticateToken, lenderController.get_lend_list);
router.get('/summary', authenticateToken, lenderController.get_summary);

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user
        next();
    });
}

module.exports = router;