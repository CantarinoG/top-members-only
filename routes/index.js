var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('main');
});
router.get('/login', function(req, res, next) {
  res.send('logIn');
});
router.get('/signup', function(req, res, next){
  res.send('signup');
});
router.get('/newmessage', function(req, res, next) {
  res.send('newmessage');
});
router.get('/memberstatus', function(req, res, next) {
  res.send('memberstatus');
});

router.post('/login', function(req, res, next) {return});
router.post('/signup', function(req, res, next) {return});
router.post('/newmessage', function(req, res, next) {return});
router.post('/memberstatus', function(req, res, next) {return});


module.exports = router;
