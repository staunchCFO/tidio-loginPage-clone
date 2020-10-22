const express = require('express');
const router = express.Router();
const IndexController = require('../controller/indexController')

router.get('/', IndexController.getLandingPage)
router.get('/login', IndexController.getLoginPage)


module.exports = router;
