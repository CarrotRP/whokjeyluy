const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const headerToken = authHeader && authHeader.split(' ')[1]; //with header (with postman for testing, can delete this)

    const cookieToken = req.cookies?.token; //token from cookie(with browser client)
    
    const token = headerToken || cookieToken;

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user
        next();
    });
}

module.exports = authenticateToken;