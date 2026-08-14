const jwt = require('jsonwebtoken');
const redis = require('../config/cache');

const getBlacklistStatus = async (token) => {
    if (!token || redis.status !== 'ready') {
        return false;
    }

    try {
        const result = await redis.get(token);
        return Boolean(result);
    } catch (error) {
        return false;
    }
};

const identifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isTokenBlacklisted = await getBlacklistStatus(token);

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: 'user has already logged out'
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: error.message
        });
    }
};

module.exports = identifyUser;