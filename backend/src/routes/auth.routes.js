const express = require('express');
const AuthRouter = express.Router();

const authController = require('../controller/auth.controller.js')

const registerValidationRules = require('../validator/auth.validator.js')

const identifyUser = require('../middleware/identifyuser.js')




AuthRouter.post('/register', registerValidationRules  ,authController.register)


AuthRouter.post('/login', authController.login)


AuthRouter.get('/getme', identifyUser, authController.getme);

AuthRouter.get("/logout",authController.logout)



module.exports = AuthRouter;