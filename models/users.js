const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//users schema
const users = new Schema({
  _id: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String }
});

module.exports = mongoose.model("users", users);
