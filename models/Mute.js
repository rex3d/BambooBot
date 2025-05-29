const { Schema, model } = require('mongoose');

module.exports = model('Mute', new Schema({
    guildId: String,
    userId: String,
    mutedUntil: Date, // null = perm mute
}));