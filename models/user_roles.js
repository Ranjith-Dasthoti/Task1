const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user_roles Schema
const userRoles = new Schema({
  _id: { type: String },
  role: { type: String }
});

module.exports = mongoose.model("user_roles", userRoles);
