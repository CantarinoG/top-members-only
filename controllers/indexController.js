const User = require('../models/user.js');
const Message = require('../models/message.js');
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.mainGet = (req, res, next) => {
    res.send('mainGet');
  }

exports.loginGet = (req, res, next) => {
    if (res.locals.currentUser) return res.redirect("/");
    res.render("login");
}

exports.signupGet = (req, res, next) => {
    res.render("signup");
}

exports.newmessageGet = (req, res, next) => {
    res.send('newMessageGet');
}

exports.memberstatusGet = (req, res, next) => {
    res.send('memberStatusGet');
}

exports.loginPost = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
      })

exports.signupPost = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            fullname: "Default"
        }).save(err => {
            if(err) {
                return next(err);
            }
            res.redirect("/");
        });
      });
}

exports.newmessagePost = (req, res, next) => {
    res.send('newmessagePost');
}

exports.memberstatusPost = (req, res, next) => {
    res.send('memberStatusPost');
}

exports.logoutPost = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}