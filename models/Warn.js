const { Schema, model } = require('mongoose');

module.exports = model('Warn', new Schema({
  guildId: String,
  userId: String,
  warnings: [
    {
      moderatorId: String,
      reason: String,
      date: { type: Date, default: Date.now }
    }
  ]
}));