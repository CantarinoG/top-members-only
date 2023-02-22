const User = require('../models/user.js');
const Message = require('../models/message.js');

exports.mainGet = (req, res, next) => {
    res.send('mainGet');
  }

exports.loginGet = (req, res, next) => {
    res.send('loginGet');
}

exports.signupGet = (req, res, next) => {
    res.send('signupGet');
}

exports.newmessageGet = (req, res, next) => {
    res.send('newMessageGet');
}

exports.memberstatusGet = (req, res, next) => {
    res.send('memberStatusGet');
}

exports.loginPost = (req, res, next) => {
    res.send('loginPost');
}

exports.signupPost = (req, res, next) => {
    res.send('signupPost');
}

exports.newmessagePost = (req, res, next) => {
    res.send('newmessagePost');
}

exports.memberstatusPost = (req, res, next) => {
    res.send('memberStatusPost');
}