// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name : { type: String, required: true },
  password: {type: String, required: true},
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
