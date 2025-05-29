// Plik: models/Ticket.js

const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
  guildId: String,
  channelId: String,
  userId: String,
  claimedBy: String,
  createdAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
});

module.exports = model('Ticket', ticketSchema);
