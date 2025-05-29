// 1. Komenda: /geoleaderboard - TOP 10 graczy
const { SlashCommandBuilder } = require('discord.js');
const GeoPlayer = require('../../models/GeoPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('geoleaderboard')
    .setDescription('Zobacz TOP 10 najlepszych graczy GeoGuess!'),

  async execute(interaction) {
    const top = await GeoPlayer.find().sort({ correctGuesses: -1 }).limit(10);

    if (!top.length) {
      return await interaction.reply('❌ Brak graczy w rankingu.');
    }

    const lines = top.map((p, i) => `**${i + 1}.** <@${p.userId}> — ${p.correctGuesses} trafień z ${p.gamesPlayed} gier`);
    await interaction.reply({ content: '🏆 **Top 10 graczy GeoGuess** 🏆\n' + lines.join('\n') });
  }
};