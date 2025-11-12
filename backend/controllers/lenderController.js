const Lender = require('../models/lenderModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const lender_login = (req, res) => {
    const {email, password} = req.body;

    Lender.findOne({email})
        .then(async result => {
            if(!result){
                return res.json("no user found!")
            }
            if(await bcrypt.compare(password, result.password) == false){
                return res.json("incorrect info");
            }

            const token = jwt.sign({id: result._id, email: result.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
            res.cookie('token', token, {
                secure: true,
                httpOnly: true
            });

            res.json({result, redirect: '/'});
        })
}

const lender_signup = async (req, res) => {
    const {username, email, password} = req.body;

    const hash_pw = await bcrypt.hash(password, 10);

    Lender.create({username, email, password: hash_pw})
        .then(result => res.json({result, redirect: '/login'}));
    
}

const check_auth = (req, res) => {
    const token = req.cookies?.token;

    if(!token) return res.json({authenticate: false, redirect: '/login'});

    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    Lender.findById(data.id).select('-password') //dont select password
        .then(result => {
            if(!result) return res.json({authenticate: false, redirect: '/login'});
            res.json({authenticate: true, redirect: '/', user: result});
        })
}

const lender_logout = (req, res) => {
    res.clearCookie('token');
    res.json({msg: 'logout', redirect: '/login'});
}

module.exports = {
    lender_login,
    lender_signup,
    check_auth,
    lender_logout
}