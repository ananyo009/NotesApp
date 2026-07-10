const jwt = require('jsonwebtoken');

const identifyUser = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
}

module.exports = identifyUser;