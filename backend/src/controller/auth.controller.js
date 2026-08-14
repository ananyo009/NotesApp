const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require('../config/cache')

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
    };
};

const register = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;

        const isuser = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isuser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await userModel.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('token', token, getCookieOptions());

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        err.status = 404
        next(err)
    }

}


async function login(req, res,next) {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select("+password");

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, getCookieOptions());

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        err.status = 404
        next(err)
    }
}

async function getme(req, res) {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "unauthorized",
        })
    }

    

       return res.status(200).json({
            message: "user exists",
           user
        })
}

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

async function verifyToken(req, res) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: 'unauthorized'
            });
        }

        const isBlacklisted = await getBlacklistStatus(token);

        if (isBlacklisted) {
            return res.status(401).json({
                message: 'unauthorized'
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            user: decode
        });
    } catch (error) {
        return res.status(401).json({
            message: 'unauthorized',
            error: error.message
        });
    }
}

async function logout(req,res) {
    
    const token = req.cookies.token;

    res.clearCookie("token");

    if (token && redis.status === 'ready') {
        try {
            await redis.set(token, Date.now().toString(), 'EX', 60 * 60);
        } catch (error) {
            console.log('Redis logout skipped:', error.message);
        }
    }

    return res.status(201).json({
        message:"logged out successfully"
    })

}

module.exports = {
     register,
    login,
    getme,
    logout,
    verifyToken
}
