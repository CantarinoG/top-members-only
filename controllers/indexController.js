const User = require('../models/user.js');
const Message = require('../models/message.js');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const user = require('../models/user.js');
require('dotenv').config();

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
    const fullname = req.body.fullname.trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const confirm = req.body.confirm.trim();

    User.findOne({ username: username})
    .exec(function (err, user) {
        
        if (err) return next(err);

        const errors = [];

        if(user != null) {
            errors.push("This username already exists.");
        }
        if (!fullname) {
            errors.push("Full name is required.");
        }
        if (fullname.length < 3) {
            errors.push("Full name must be at least 3 characters.");
        }
        if (!username) {
            errors.push("Username is required.");
        }
        if (username.length < 3) {
            errors.push("Username must be at least 3 characters.");
        }
        if (!password || !confirm) {
            errors.push("Password is required.");
        }
        if (password != confirm) {
            errors.push("Passwords do not match.")
        }

        if(errors.length) {
            const currentData = {
                fullname: fullname,
                username: username
            }
            res.render("signup", {
                user: res.locals.currentUser,
                errors: errors,
                currentData: currentData
            });
            return;
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return next(err);
                const user = new User({
                    fullname: fullname,
                    username: username,
                    password: hashedPassword,
                }).save(err => {
                    if(err) {
                        return next(err);
                    }
                    res.redirect("/login");
                });
            });
        }

    });
}

exports.newmessagePost = (req, res, next) => {
    const title = req.body.title.trim();
    const content = req.body.content.trim();

    const errors = [];

    if(!title) {
        errors.push("Title is required.");
    }
    if(!content) {
        errors.push("Content is required.");
    }
    if(errors.length) {
        const currentData = {
            title: title,
            content: content
        }
        res.render("newmessage", {
            user: res.locals.currentUser,
            errors: errors,
            currentData: currentData
        });
        return;
    } else {
        const message = new Message({
            title: title,
            content: content,
            user: res.locals.currentUser._id
        }).save(err => {
            if(err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
}

exports.memberstatusPost = (req, res, next) => {
    const password = req.body.password.trim();

    const errors = [];

    if(res.locals.currentUser.status == "Member" || res.locals.currentUser.status == "Admin") {
        errors.push("You are already a member.");
    } else if (password != process.env.MEMBER_PASS) {
        errors.push("Wrong password. You did not become a member.");
    }
    
    if(errors.length) {
        res.render("memberstatus", {
            user: res.locals.currentUser,
            errors: errors
        });
        return;
    } else {
        User.findByIdAndUpdate(res.locals.currentUser._id, {
            fullname: res.locals.currentUser.fullname,
            username: res.locals.currentUser.username,
            password: res.locals.currentUser.password,
            status: "Member"
        }, {}, (err, updatedUser) => {
            if(err) return next(err);
            res.redirect("/");
        });
    }

}

exports.logoutPost = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}