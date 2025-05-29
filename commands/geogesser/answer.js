const { SlashCommandBuilder } = require('discord.js');
const GeoPlayer = require('../../models/GeoPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('answer')
    .setDescription('Odpowiedz na zdjęcie z GeoGuess!')
    .addStringOption(option =>
      option.setName('country')
        .setDescription('Twoja odpowiedź (nazwa kraju)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const answer = interaction.options.getString('country').toLowerCase();
    const player = await GeoPlayer.findOne({ userId: interaction.user.id });

    if (!player || !player.lastGuess) {
      return await interaction.reply({
        content: '❌ Nie masz aktywnej gry. Użyj `/geoguess`, żeby zacząć.',
        ephemeral: true
      });
    }

    const correct = player.lastGuess.toLowerCase();

    if (answer === correct) {
      await interaction.reply('✅ Brawo, zgadłeś! To był **' + correct + '**!');
      // opcjonalnie: player.lastGuess = null; await player.save();
    } else {
      await interaction.reply('❌ Niestety, to nie to. Spróbuj jeszcze raz!');
    }
  }
};
