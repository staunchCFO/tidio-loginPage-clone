const express = require('express');
const router = express.Router();
const IndexController = require('../controller/indexController')

router.get('/', IndexController.getLandingPage)
router.get('/login', IndexController.getLoginPage)
router.post('/login', IndexController.postLogin)
router.get('/register', IndexController.getCreateAccountPage)
router.get('/register-email', IndexController.getRegisterEmailPage)
router.post('/register-email', IndexController.postRegistration)
router.get('/dashboard' , IndexController.getDashboard)
router.get('/logout' , IndexController.getLogout)



module.exports = router;
