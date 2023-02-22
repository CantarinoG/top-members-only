var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.mainGet);
router.get('/login', indexController.loginGet);
router.get('/signup', indexController.signupGet);
router.get('/newmessage', indexController.newmessageGet);
router.get('/memberstatus', indexController.memberstatusGet);

router.post('/login', indexController.loginPost);
router.post('/signup', indexController.signupPost);
router.post('/newmessage', indexController.newmessagePost);
router.post('/memberstatus', indexController.memberstatusPost);

module.exports = router;
