const express = require('express');
const router = express.Router();
const IndexController = require('../controller/indexController')

router.get('/', IndexController.getLandingPage)
router.get('/login', IndexController.getLoginPage)
router.post('/login' , IndexController.getLoginPage)
router.get('/register', IndexController.getCreateAccountPage)


module.exports = router;
