const Mute = require('../models/Mute'); // Dodaj ten import

module.exports = async (client) => {
  try {
    const now = new Date();
    console.log('Rozpoczynam zapytanie do bazy danych...');
const expiredMutes = await Mute.find({ mutedUntil: { $lte: now } });
console.log('Zapytanie zakończone.');

    for (const mute of expiredMutes) {
      const guild = client.guilds.cache.get(mute.guildId);
      if (!guild) continue;

      try {
        const member = await guild.members.fetch(mute.userId);
        await member.timeout(null); // Odciszenie
        await Mute.deleteOne({ _id: mute._id });
        console.log(`🔊 Auto-unmute: ${member.user.tag}`);
      } catch (err) {
        console.error(`❌ Błąd unmute:`, err);
      }
    }
  } catch (err) {
    console.error('❌ Błąd podczas sprawdzania wyciszeń:', err);
  }
};