#! /usr/bin/env node

const async = require('async')
const User = require('./models/user')
const Message = require("./models/message")
const bcrypt = require('bcryptjs')
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); 
const mongoDB = process.env.MONGODB_URI;
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const users = [];
const messages = [];

function userCreate(fullname, username, password, status, cb) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            return;
        }   

        userDetail = {
            fullname: fullname,
            username: username,
            password: hashedPassword,
            status: status
        }

        const user = new User(userDetail);
        user.save(function(err) {
            if(err) {
                cb(err, null);
                return;
            }
            console.log("New user: ", user);
            users.push(user);
            cb(null, user);
        });
   
    });
}

function messageCreate(title, message, user, cb) {
    messageDetail = {
        title: title,
        content: message,
        user: user
    }
    const newMessage = new Message(messageDetail);
    newMessage.save(function (err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log("New message: ", newMessage);
        messages.push(newMessage);
        cb(null, newMessage);
    });
}

function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate("Guilherme Cantarino", "CantarinoG", "123456", "Admin", callback);
        }
    ], cb);
}

function createMessages(cb) {
    async.parallel([
        function(callback) {
          messageCreate("First Message", "Hello World!", users[0], callback);
        },
        function(callback) {
          messageCreate("Second Message", "How are you, world?", users[0], callback);
        },
        function(callback) {
          messageCreate("Third Message", "Goodbye World!", users[0], callback);
        },
        ],
        cb);
}


async.series([
    createUsers,
    createMessages
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    mongoose.connection.close();
});