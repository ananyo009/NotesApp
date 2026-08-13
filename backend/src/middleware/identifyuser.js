const jwt = require('jsonwebtoken');
const redis = require('../config/cache')

 const identifyUser = async (req, res, next) => {
    const token = req.cookies.token;

     
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const istokenBacklisted = await redis.get(token);

    
   

    if (istokenBacklisted) {
        return res.status(401).json({
            message:"user has already logged out"
        })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
}

module.exports = identifyUser;