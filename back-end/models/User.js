const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // The email address must be unique to the account
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);