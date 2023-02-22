const User = require('../models/user.js');
const Message = require('../models/message.js');
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.mainGet = (req, res, next) => {
    Message.find({})
    .sort({timestamp: -1})
    .populate("user")
    .exec(
        function (err, messages) {
            if (err) return next(err);
            res.render("index", {
                user: res.locals.currentUser,
                messages: messages 
            });
        }
    );
  }

exports.loginGet = (req, res, next) => {
    if (res.locals.currentUser) return res.redirect("/");
    let alert = req.query.success;
    res.render("login", {
        user: res.locals.currentUser,
        alert: alert
    });
}

exports.signupGet = (req, res, next) => {
    if (res.locals.currentUser) return res.redirect("/");
    res.render("signup", {
        user: res.locals.currentUser
    });
}

exports.newmessageGet = (req, res, next) => {
    if (!res.locals.currentUser) return res.redirect("/");
    res.render('newmessage', {
        user: res.locals.currentUser
    });
}

exports.memberstatusGet = (req, res, next) => {
    if (!res.locals.currentUser) return res.redirect("/");
    res.render('memberstatus', {
        user: res.locals.currentUser
    });
}

exports.loginPost = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login?success=false"
      }
)

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