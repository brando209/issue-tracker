const jwt = require('jsonwebtoken');

const authorizeJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).send({ success: false, message: "No auth token"});

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).send({ success: false, message: err.message });
        }
        req.user = user;
        next();
    }); 
}

const authorizeUser = (req, res, next) => {
    next();
}

module.exports = {
    authorizeJWT, authorizeUser
}