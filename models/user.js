const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: { type: String, required: true, minLenght: 3 },
    username: { type: String, required: true, minLenght: 3 },
    password: { type: String, required: true },
    status: { type: String, required: true, enum: ["Default", "Member", "Admin"], default: "Default"}
});

module.exports = mongoose.model("User", UserSchema);