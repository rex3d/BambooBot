const { SlashCommandBuilder } = require('discord.js');
const GeoPlayer = require('../../models/GeoPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('geostats')
    .setDescription('Pokaż swoje statystyki GeoGuess'),

  async execute(interaction) {
    const player = await GeoPlayer.findOne({ userId: interaction.user.id });

    if (!player) {
      return await interaction.reply({ content: 'Nie masz jeszcze statystyk. Zagraj `/geoguess`!', ephemeral: true });
    }

    await interaction.reply({
      content: `🧭 Twoje staty:\n• Gry: **${player.gamesPlayed}**\n• Trafione: **${player.correctGuesses}**`,
      ephemeral: true
    });
  }
};
