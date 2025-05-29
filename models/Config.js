//Plik: models/Config.js

const { Schema, model } = require('mongoose');

const configSchema = new Schema({
  guildId: String,
  ticketCategory: String,
  ticketLimit: { type: Number, default: 1 },
  autoCloseAfter: { type: Number, default: 24 }, // godziny
});

module.exports = model('Config', configSchema);
