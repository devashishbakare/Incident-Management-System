const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const homeController = require('../controllers/home_controller');
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/register-user', userController.signUp);
router.post('/createUser', userController.createUserSchema);
router.post('/createSession',  passport.authenticate('local', { failureRedirect: '/login' }),userController.createSession);
router.get('/home', passport.checkAuthentication ,homeController.home);
router.get('/sign-out', userController.destroySession);
module.exports = router;
