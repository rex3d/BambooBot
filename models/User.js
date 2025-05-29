const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: String,
  username: String,
  coins: { type: Number, default: 0 },
});

module.exports = model('User', userSchema);
