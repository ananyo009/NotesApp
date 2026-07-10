const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(404).json({ errors: errors.array() });
}

const registerValidationRules = [
    body("username").isString().withMessage("Username must be a string").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format").notEmpty().withMessage("Email is required"),
    body("password").isLength({ min: 6, max: 12 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required"),
    validate
]

module.exports = registerValidationRules