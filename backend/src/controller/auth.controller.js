const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getCookieOptions = () => ({
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
});

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

module.exports = {
     register,
    login,
    getme
}
