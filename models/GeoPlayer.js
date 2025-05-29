// models/GeoPlayer.js
const { Schema, model } = require('mongoose');

const geoPlayerSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  gamesPlayed: { type: Number, default: 0 },
  correctGuesses: { type: Number, default: 0 },
  lastGuess: { type: String, default: null },
});

module.exports = model('GeoPlayer', geoPlayerSchema);
