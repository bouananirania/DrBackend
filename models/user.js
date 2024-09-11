const mongoose = require("mongoose");
const {drSoftware}=require("../config/db");
const user = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true }
    });
const User = drSoftware.model("User",user);
module.exports = User;