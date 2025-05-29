// 2. Komenda: /georeset - Resetuje twoje statystyki (z potwierdzeniem)
const { SlashCommandBuilder } = require('discord.js');
const GeoPlayer = require('../../models/GeoPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('georeset')
    .setDescription('Resetuj swoje statystyki GeoGuess (ostrzeżenie: nieodwracalne!)'),

  async execute(interaction) {
    const player = await GeoPlayer.findOne({ userId: interaction.user.id });

    if (!player) {
      return await interaction.reply({ content: 'Nie masz żadnych statystyk do usunięcia.', ephemeral: true });
    }

    await GeoPlayer.deleteOne({ userId: interaction.user.id });
    await interaction.reply({ content: '🗑️ Twoje statystyki zostały usunięte.', ephemeral: true });
  }
};