var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', (req, res, next) => {
    res.render("index", {
        user: res.locals.currentUser
    })
});

router.get('/login', indexController.loginGet);
router.get('/signup', indexController.signupGet);
router.get('/newmessage', indexController.newmessageGet);
router.get('/memberstatus', indexController.memberstatusGet);

router.post('/login', indexController.loginPost);
router.post('/signup', indexController.signupPost);
router.post('/newmessage', indexController.newmessagePost);
router.post('/memberstatus', indexController.memberstatusPost);
router.post('/logout', indexController.logoutPost);

module.exports = router;
